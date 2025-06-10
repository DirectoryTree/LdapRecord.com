import { slugifyWithCounter } from '@sindresorhus/slugify';
import glob from 'fast-glob';
import * as fs from 'fs';
import { toString } from 'mdast-util-to-string';
import * as path from 'path';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { createLoader } from 'simple-functional-loader';
import { filter } from 'unist-util-filter';
import { SKIP, visit } from 'unist-util-visit';
import * as url from 'url';

const slugify = slugifyWithCounter();
const __filename = url.fileURLToPath(import.meta.url);
const processor = remark().use(remarkMdx).use(extractSections);

function isObjectExpression(node) {
    return (
        node.type === 'mdxTextExpression' &&
        node.data?.estree?.body?.[0]?.expression?.type === 'ObjectExpression'
    );
}

function excludeObjectExpressions(tree) {
    return filter(tree, (node) => !isObjectExpression(node));
}

function extractSections() {
    return (tree, { sections }) => {
        slugify.reset();

        visit(tree, (node) => {
            if (node.type === 'heading' || node.type === 'paragraph') {
                let content = toString(excludeObjectExpressions(node));
                if (node.type === 'heading' && node.depth <= 2) {
                    let hash = node.depth === 1 ? null : slugify(content);
                    sections.push([content, hash, []]);
                } else {
                    sections.at(-1)?.[2].push(content);
                }
                return SKIP;
            }
        });
    };
}

export default function Search(nextConfig = {}) {
    let cache = new Map();

    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            config.module.rules.push({
                test: __filename,
                use: [
                    createLoader(function () {
                        let appDir = path.resolve('./src/app');
                        this.addContextDependency(appDir);

                        let files = glob.sync('**/*.mdx', { cwd: appDir });
                        let data = files.map((file) => {
                            let url =
                                '/' + file.replace(/(^|\/)page\.mdx$/, '');
                            let mdx = fs.readFileSync(
                                path.join(appDir, file),
                                'utf8',
                            );

                            // Extract package and version from file path
                            let packageName = null;
                            let version = null;
                            const pathParts = file.split('/');
                            if (
                                pathParts[0] === 'docs' &&
                                pathParts.length >= 3
                            ) {
                                packageName = pathParts[1]; // 'core' or 'laravel'
                                version = pathParts[2]; // 'v1', 'v2', 'v3', etc.
                            }

                            let sections = [];

                            if (cache.get(file)?.[0] === mdx) {
                                sections = cache.get(file)[1];
                            } else {
                                let vfile = { value: mdx, sections };
                                processor.runSync(
                                    processor.parse(vfile),
                                    vfile,
                                );
                                cache.set(file, [mdx, sections]);
                            }

                            return { url, sections, packageName, version };
                        });

                        // When this file is imported within the application
                        // the following module is loaded:
                        return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: 'content',
                  store: ['title', 'pageTitle', 'packageName', 'version'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections, packageName, version } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                    packageName,
                    version,
                  })
                }
              }

              export function search(query, options = {}) {
                const { packageName: filterPackage, version: filterVersion, ...searchOptions } = options

                let result = sectionIndex.search(query, {
                  ...searchOptions,
                  enrich: true,
                })
                if (result.length === 0) {
                  return []
                }

                let items = result[0].result.map((item) => ({
                  url: item.id,
                  title: item.doc.title,
                  pageTitle: item.doc.pageTitle,
                  packageName: item.doc.packageName,
                  version: item.doc.version,
                }))

                // Filter by package and version if specified
                if (filterPackage || filterVersion) {
                  items = items.filter((item) => {
                    if (filterPackage && item.packageName !== filterPackage) {
                      return false
                    }
                    if (filterVersion && item.version !== filterVersion) {
                      return false
                    }
                    return true
                  })
                }

                return items
              }
            `;
                    }),
                ],
            });

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options);
            }

            return config;
        },
    });
}
