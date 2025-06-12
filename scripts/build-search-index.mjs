#!/usr/bin/env node

import * as fs from 'fs';
import * as url from 'url';
import glob from 'fast-glob';
import * as path from 'path';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { filter } from 'unist-util-filter';
import { SKIP, visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { slugifyWithCounter } from '@sindresorhus/slugify';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const slugify = slugifyWithCounter();
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

async function buildSearchIndex() {
    console.log('Building search index...');
    
    const appDir = path.resolve(__dirname, '../src/app');
    const outputPath = path.resolve(__dirname, '../src/data/search-index.json');
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Find all MDX files
    const files = glob.sync('**/*.mdx', { cwd: appDir });

    console.log(`Found ${files.length} MDX files`);

    const searchData = [];

    for (const file of files) {
        const url = '/' + file.replace(/(^|\/)page\.mdx$/, '');
        const mdx = fs.readFileSync(path.join(appDir, file), 'utf8');

        // Extract package and version from file path
        let packageName = null;
        let version = null;

        const pathParts = file.split('/');

        if (pathParts[0] === 'docs' && pathParts.length >= 3) {
            packageName = pathParts[1]; // 'core' or 'laravel'
            version = pathParts[2]; // 'v1', 'v2', 'v3', etc.
        }

        const sections = [];
        const vfile = { value: mdx, sections };
        
        try {
            processor.runSync(processor.parse(vfile), vfile);
        } catch (error) {
            console.warn(`Warning: Failed to process ${file}:`, error.message);

            continue;
        }

        // Create search entries for each section
        for (const [title, hash, content] of sections) {
            searchData.push({
                url: url + (hash ? '#' + hash : ''),
                title,
                content: [title, ...content].join('\n'),
                pageTitle: hash ? sections[0][0] : undefined,
                packageName,
                version,
            });
        }
    }

    // Write the search index
    fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));

    console.log(`Search index built with ${searchData.length} entries`);
    console.log(`Output: ${outputPath}`);
}

// Export the function for use in Next.js config
export { buildSearchIndex };

// Run the build when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    buildSearchIndex().catch((error) => {
        console.error('Failed to build search index:', error);
        process.exit(1);
    });
}
