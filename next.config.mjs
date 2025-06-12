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

// Global flag to prevent duplicate builds across multiple webpack instances
let searchIndexBuilt = false;

// Custom webpack plugin to build search index
class SearchIndexPlugin {
    apply(compiler) {
        compiler.hooks.beforeCompile.tapAsync('SearchIndexPlugin', async (params, callback) => {
            if (!searchIndexBuilt) {
                console.log('Building search index...');
                try {
                    await buildSearchIndex();
                    searchIndexBuilt = true;
                    console.log('Search index built successfully');
                } catch (error) {
                    console.error('Failed to build search index:', error);
                    return callback(error);
                }
            }
            callback();
        });

        // Also rebuild on file changes in development
        if (compiler.options.mode === 'development') {
            compiler.hooks.watchRun.tapAsync('SearchIndexPlugin', async (compiler, callback) => {
                const changedFiles = compiler.modifiedFiles || new Set();
                const mdxChanged = Array.from(changedFiles).some(file => file.endsWith('.mdx'));

                if (mdxChanged) {
                    console.log('MDX files changed, rebuilding search index...');
                    try {
                        await buildSearchIndex();
                        console.log('Search index rebuilt successfully');
                    } catch (error) {
                        console.error('Failed to rebuild search index:', error);
                    }
                }
                callback();
            });
        }
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    outputFileTracingIncludes: {
        '/**/*': ['./src/app/**/*.mdx'],
    },
    webpack: (config, { dev, isServer }) => {
        // Only add the plugin on the server side to avoid duplicate builds
        if (isServer) {
            config.plugins.push(new SearchIndexPlugin());
        }

        return config;
    },
};

export default withMDX(nextConfig);
