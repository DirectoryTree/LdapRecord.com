import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { toString } from 'mdast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import shiki from 'shiki';
import { visit } from 'unist-util-visit';

function rehypeParseCodeBlocks() {
    return (tree) => {
        visit(tree, 'element', (node, _nodeIndex, parentNode) => {
            if (
                node.tagName === 'code' &&
                parentNode &&
                parentNode.properties
            ) {
                parentNode.properties.language = node.properties.className
                    ? node.properties?.className[0]?.replace(/^language-/, '')
                    : 'txt';
            }
        });
    };
}

let highlighter;

function rehypeShiki() {
    return async (tree) => {
        highlighter =
            highlighter ??
            (await shiki.getHighlighter({ theme: 'css-variables' }));

        visit(tree, 'element', (node) => {
            if (
                node.tagName === 'pre' &&
                node.children[0]?.tagName === 'code'
            ) {
                let codeNode = node.children[0];
                let textNode = codeNode.children[0];

                node.properties.code = textNode.value;

                if (node.properties.language) {
                    // Handle unsupported languages gracefully
                    let language = node.properties.language;

                    // Map unsupported languages to supported ones
                    const languageMap = {
                        dotenv: 'bash',
                        env: 'bash',
                    };

                    if (languageMap[language]) {
                        language = languageMap[language];
                    }

                    try {
                        let tokens = highlighter.codeToThemedTokens(
                            textNode.value,
                            language,
                        );

                        textNode.value = shiki.renderToHtml(tokens, {
                            elements: {
                                pre: ({ children }) => children,
                                code: ({ children }) => children,
                                line: ({ children }) =>
                                    `<span>${children}</span>`,
                            },
                        });
                    } catch (error) {
                        // If language is not supported, fall back to plain text
                        console.warn(
                            `Language "${node.properties.language}" not supported by Shiki, falling back to plain text`,
                        );
                        // Keep the original text without syntax highlighting
                    }
                }
            }
        });
    };
}

function rehypeSlugify() {
    return (tree) => {
        let slugify = slugifyWithCounter();
        visit(tree, 'element', (node) => {
            if ((node.tagName === 'h2' || node.tagName === 'h3') && !node.properties.id) {
                node.properties.id = slugify(toString(node));
            }
        });
    };
}

function rehypeAddMDXExports(getExports) {
    return (tree) => {
        let exports = Object.entries(getExports(tree));

        for (let [name, value] of exports) {
            for (let node of tree.children) {
                if (
                    node.type === 'mdxjsEsm' &&
                    new RegExp(`export\\s+const\\s+${name}\\s*=`).test(
                        node.value,
                    )
                ) {
                    return;
                }
            }

            let exportStr = `export const ${name} = ${value}`;

            tree.children.push({
                type: 'mdxjsEsm',
                value: exportStr,
                data: {
                    estree: acorn.parse(exportStr, {
                        sourceType: 'module',
                        ecmaVersion: 'latest',
                    }),
                },
            });
        }
    };
}

function getSections(node) {
    let sections = [];

    for (let child of node.children ?? []) {
        if (child.type === 'element' && (child.tagName === 'h2' || child.tagName === 'h3')) {
            sections.push(`{
        title: ${JSON.stringify(toString(child))},
        id: ${JSON.stringify(child.properties.id)},
        level: ${child.tagName === 'h2' ? 2 : 3},
        ...${child.properties.annotation}
      }`);
        } else if (child.children) {
            sections.push(...getSections(child));
        }
    }

    return sections;
}

export const rehypePlugins = [
    mdxAnnotations.rehype,
    rehypeParseCodeBlocks,
    rehypeShiki,
    rehypeSlugify,
    [
        rehypeAddMDXExports,
        (tree) => ({
            sections: `[${getSections(tree).join()}]`,
        }),
    ],
];
