import nextMDX from '@next/mdx';
import { recmaPlugins } from './src/mdx/recma.mjs';
import { rehypePlugins } from './src/mdx/rehype.mjs';
import { remarkPlugins } from './src/mdx/remark.mjs';
import { buildSearchIndex } from './scripts/build-search-index.mjs';

const withMDX = nextMDX({
    options: {
        remarkPlugins,
        rehypePlugins,
        recmaPlugins,
    },
});

// Build search index immediately when config is loaded
console.log('Building search index...');
await buildSearchIndex();
console.log('Search index built successfully');

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    outputFileTracingIncludes: {
        '/**/*': ['./src/app/**/*.mdx'],
    },
};

export default withMDX(nextConfig);
