import FlexSearch from 'flexsearch';

// Cache for the full search index data
let searchDataCache = null;

// Cache for search indices by package/version combination
let searchIndexCache = new Map();

// Fetch the full search index once and cache it
async function fetchSearchData() {
    if (searchDataCache) {
        return searchDataCache;
    }

    const response = await fetch('/search-index.json');

    if (!response.ok) {
        throw new Error(`Failed to fetch search data: ${response.status}`);
    }

    searchDataCache = await response.json();

    return searchDataCache;
}

// Initialize the search index for a specific package and version
async function initializeSearch(packageName, version) {
    const cacheKey = `${packageName || 'all'}-${version || 'all'}`;

    if (searchIndexCache.has(cacheKey)) {
        return searchIndexCache.get(cacheKey); // Already initialized
    }

    try {
        const allData = await fetchSearchData();

        // Filter search data based on package and version if provided
        const searchData = (packageName || version)
            ? allData.filter((item) => {
                if (packageName && item.packageName !== packageName) {
                    return false;
                }

                if (version && item.version !== version) {
                    return false;
                }

                return true;
            })
            : allData;

        // Create FlexSearch index
        const sectionIndex = new FlexSearch.Document({
            tokenize: 'full',
            document: {
                id: 'url',
                index: 'content',
                store: ['title', 'pageTitle', 'packageName', 'version'],
            },
            context: {
                resolution: 9,
                depth: 2,
                bidirectional: true,
            },
        });

        // Add all documents to the index
        for (const item of searchData) {
            sectionIndex.add(item);
        }

        console.log(`Search index initialized for ${cacheKey} with ${searchData.length} entries`);

        // Cache the index
        searchIndexCache.set(cacheKey, sectionIndex);

        return sectionIndex;
    } catch (error) {
        console.error('Failed to initialize search:', error);

        throw error;
    }
}

export async function search(query, options = {}) {
    const { packageName, version, ...searchOptions } = options;

    const sectionIndex = await initializeSearch(packageName, version);

    if (!sectionIndex || !query.trim()) {
        return [];
    }

    try {
        const result = sectionIndex.search(query, {
            ...searchOptions,
            enrich: true,
        });

        if (!result.length) {
            return [];
        }

        return result[0].result.map((item) => ({
            url: item.id,
            title: item.doc.title,
            version: item.doc.version,
            pageTitle: item.doc.pageTitle,
            packageName: item.doc.packageName,
        }));
    } catch (error) {
        console.error('Search failed:', error);

        return [];
    }
}
