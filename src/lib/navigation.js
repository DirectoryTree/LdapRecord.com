export const homeNavigation = [
    {
        title: 'Getting Started',
        links: [{ title: 'Overview', href: '/' }],
    },
    {
        title: 'LdapRecord Core',
        links: [
            { title: 'Core Overview', href: '/docs/core/v3' },
            { title: 'Core Installation', href: '/docs/core/v3/installation' },
            { title: 'Core Quickstart', href: '/docs/core/v3/quickstart' },
        ],
    },
    {
        title: 'LdapRecord Laravel',
        links: [
            { title: 'Laravel Overview', href: '/docs/laravel/v3' },
            {
                title: 'Laravel Installation',
                href: '/docs/laravel/v3/installation',
            },
            {
                title: 'Laravel Quickstart',
                href: '/docs/laravel/v3/quickstart',
            },
        ],
    },
    {
        title: 'Resources',
        links: [
            {
                title: 'GitHub Repository',
                href: 'https://github.com/DirectoryTree/LdapRecord',
            },
            {
                title: 'Support & Sponsorship',
                href: 'https://github.com/sponsors/stevebauman',
            },
            {
                title: 'Report Issues',
                href: 'https://github.com/DirectoryTree/LdapRecord/issues',
            },
        ],
    },
];

export const navigationConfig = {
    core: {
        v1: [
            {
                title: 'Introduction',
                links: [
                    { title: 'Quickstart', href: '/docs/core/v1/quickstart' },
                    { title: 'Overview', href: '/docs/core/v1' },
                    { title: 'Installation', href: '/docs/core/v1/installation' },
                    { title: 'Configuration', href: '/docs/core/v1/configuration' },
                    { title: 'Connections', href: '/docs/core/v1/connections' },
                ],
            },
            {
                title: 'Searching',
                links: [
                    { title: 'Query Builder', href: '/docs/core/v1/searching' },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v1/searching-api',
                    },
                ],
            },
            {
                title: 'Models',
                links: [
                    { title: 'Getting Started', href: '/docs/core/v1/models' },
                    { title: 'Scopes', href: '/docs/core/v1/model-scopes' },
                    {
                        title: 'Relationships',
                        href: '/docs/core/v1/model-relationships',
                    },
                    {
                        title: 'Accessors & Mutators',
                        href: '/docs/core/v1/model-mutators',
                    },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v1/model-api',
                    },
                ],
            },
            {
                title: 'Active Directory',
                links: [
                    { title: 'Users', href: '/docs/core/v1/active-directory/users' },
                    { title: 'Groups', href: '/docs/core/v1/active-directory/groups' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Authentication', href: '/docs/core/v1/authentication' },
                    { title: 'Common Queries', href: '/docs/core/v1/common-queries' },
                    { title: 'Caching', href: '/docs/core/v1/caching' },
                    { title: 'Events', href: '/docs/core/v1/events' },
                    { title: 'Logging', href: '/docs/core/v1/logging' },
                    { title: 'Testing', href: '/docs/core/v1/testing' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/core/v1/versioning' },
                    { title: 'Credits', href: '/docs/core/v1/credits' },
                    { title: 'License', href: '/docs/core/v1/license' },
                ],
            },
        ],
        v2: [
            {
                title: 'Upgrade Guide',
                links: [
                    { title: 'Upgrading from v1', href: '/docs/core/v2/upgrading' },
                ],
            },
            {
                title: 'Introduction',
                links: [
                    { title: 'Quickstart', href: '/docs/core/v2/quickstart' },
                    { title: 'Overview', href: '/docs/core/v2' },
                    { title: 'Installation', href: '/docs/core/v2/installation' },
                    { title: 'Configuration', href: '/docs/core/v2/configuration' },
                    { title: 'Connections', href: '/docs/core/v2/connections' },
                ],
            },
            {
                title: 'Searching',
                links: [
                    { title: 'Query Builder', href: '/docs/core/v2/searching' },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v2/searching-api',
                    },
                ],
            },
            {
                title: 'Models',
                links: [
                    { title: 'Getting Started', href: '/docs/core/v2/models' },
                    { title: 'Scopes', href: '/docs/core/v2/model-scopes' },
                    {
                        title: 'Relationships',
                        href: '/docs/core/v2/model-relationships',
                    },
                    {
                        title: 'Accessors & Mutators',
                        href: '/docs/core/v2/model-mutators',
                    },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v2/model-api',
                    },
                    {
                        title: 'Query API (Available Methods)',
                        href: '/docs/core/v2/model-searching',
                    },
                ],
            },
            {
                title: 'Active Directory',
                links: [
                    { title: 'Users', href: '/docs/core/v2/active-directory/users' },
                    { title: 'Groups', href: '/docs/core/v2/active-directory/groups' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Authentication', href: '/docs/core/v2/authentication' },
                    { title: 'Common Queries', href: '/docs/core/v2/common-queries' },
                    { title: 'Filter Parser', href: '/docs/core/v2/filter-parser' },
                    { title: 'Helpers', href: '/docs/core/v2/helpers' },
                    { title: 'Caching', href: '/docs/core/v2/caching' },
                    { title: 'Events', href: '/docs/core/v2/events' },
                    { title: 'Logging', href: '/docs/core/v2/logging' },
                    { title: 'Testing', href: '/docs/core/v2/testing' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/core/v2/versioning' },
                    { title: 'Credits', href: '/docs/core/v2/credits' },
                    { title: 'License', href: '/docs/core/v2/license' },
                ],
            },
        ],
        v3: [
            {
                title: 'Prologue',
                links: [
                    { title: 'Release Notes', href: '/docs/core/v3/release-notes' },
                    { title: 'Upgrade Guide', href: '/docs/core/v3/upgrading' },
                ],
            },
            {
                title: 'Introduction',
                links: [
                    { title: 'Quickstart', href: '/docs/core/v3/quickstart' },
                    { title: 'Overview', href: '/docs/core/v3' },
                    { title: 'Installation', href: '/docs/core/v3/installation' },
                    { title: 'Configuration', href: '/docs/core/v3/configuration' },
                    { title: 'Connections', href: '/docs/core/v3/connections' },
                ],
            },
            {
                title: 'Searching',
                links: [
                    { title: 'Query Builder', href: '/docs/core/v3/searching' },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v3/searching-api',
                    },
                ],
            },
            {
                title: 'Models',
                links: [
                    { title: 'Getting Started', href: '/docs/core/v3/models' },
                    { title: 'Scopes', href: '/docs/core/v3/model-scopes' },
                    {
                        title: 'Relationships',
                        href: '/docs/core/v3/model-relationships',
                    },
                    {
                        title: 'Accessors & Mutators',
                        href: '/docs/core/v3/model-mutators',
                    },
                    {
                        title: 'API (Available Methods)',
                        href: '/docs/core/v3/model-api',
                    },
                    {
                        title: 'Query API (Available Methods)',
                        href: '/docs/core/v3/model-searching',
                    },
                ],
            },
            {
                title: 'Active Directory',
                links: [
                    { title: 'Users', href: '/docs/core/v3/active-directory/users' },
                    { title: 'Groups', href: '/docs/core/v3/active-directory/groups' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Authentication', href: '/docs/core/v3/authentication' },
                    { title: 'Common Queries', href: '/docs/core/v3/common-queries' },
                    { title: 'Filter Parser', href: '/docs/core/v3/filter-parser' },
                    { title: 'Helpers', href: '/docs/core/v3/helpers' },
                    { title: 'Caching', href: '/docs/core/v3/caching' },
                    { title: 'Events', href: '/docs/core/v3/events' },
                    { title: 'Logging', href: '/docs/core/v3/logging' },
                    { title: 'Testing', href: '/docs/core/v3/testing' },
                    { title: 'Testing API', href: '/docs/core/v3/testing-api' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/core/v3/versioning' },
                    { title: 'Credits', href: '/docs/core/v3/credits' },
                    { title: 'License', href: '/docs/core/v3/license' },
                ],
            },
        ],
    },
    laravel: {
        v1: [
            {
                title: 'Introduction',
                links: [
                    { title: 'Quickstart', href: '/docs/laravel/v1/quickstart' },
                    { title: 'Overview', href: '/docs/laravel/v1' },
                    { title: 'Installation', href: '/docs/laravel/v1/installation' },
                    { title: 'Usage', href: '/docs/laravel/v1/usage' },
                ],
            },
            {
                title: 'Authentication',
                links: [
                    { title: 'Quickstart', href: '/docs/laravel/v1/auth/quickstart' },
                    { title: 'Overview', href: '/docs/laravel/v1/auth' },
                    { title: 'Installation', href: '/docs/laravel/v1/auth/installation' },
                    { title: 'Configuration', href: '/docs/laravel/v1/auth/configuration' },
                    { title: 'Setup', href: '/docs/laravel/v1/auth/setup' },
                    { title: 'Laravel Jetsream', href: '/docs/laravel/v1/auth/laravel-jetstream' },
                    { title: 'Laravel UI', href: '/docs/laravel/v1/auth/laravel-ui' },
                    { title: 'Multi-Domain - Laravel UI', href: '/docs/laravel/v1/auth/multi-domain' },
                    { title: 'Importing Users', href: '/docs/laravel/v1/auth/importing' },
                    { title: 'Restricting Sign In', href: '/docs/laravel/v1/auth/restricting-sign-in' },
                    { title: 'Testing', href: '/docs/laravel/v1/auth/testing' },
                ],
            },
            {
                title: 'SSO Authentication',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v1/auth/sso' },
                    { title: 'Setup', href: '/docs/laravel/v1/auth/sso/setup' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Lumen', href: '/docs/laravel/v1/lumen' },
                    { title: 'Events', href: '/docs/laravel/v1/events' },
                    { title: 'Testing', href: '/docs/laravel/v1/testing' },
                    { title: 'Debugging', href: '/docs/laravel/v1/debugging' },
                    { title: 'Importing Objects', href: '/docs/laravel/v1/importing' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/laravel/v1/versioning' },
                    { title: 'License', href: '/docs/laravel/v1/license' },
                ],
            },
        ],
        v2: [
            {
                title: 'Upgrade Guide',
                links: [
                    { title: 'Upgrading from v1', href: '/docs/laravel/v2/upgrading' },
                ],
            },
            {
                title: 'Introduction',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v2' },
                    { title: 'Installation', href: '/docs/laravel/v2/installation' },
                    { title: 'Configuration', href: '/docs/laravel/v2/configuration' },
                    { title: 'Usage', href: '/docs/laravel/v2/usage' },
                ],
            },
            {
                title: 'Authentication',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v2/auth' },
                    { title: 'Multi-Domain', href: '/docs/laravel/v2/auth/multi-domain' },
                    { title: 'Restricting Login', href: '/docs/laravel/v2/auth/restricting-login' },
                    { title: 'Testing', href: '/docs/laravel/v2/auth/testing' },
                ],
            },
            {
                title: 'Plain Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v2/auth/plain' },
                    { title: 'Configuration', href: '/docs/laravel/v2/auth/plain/configuration' },
                    { title: 'Logging In', href: '/docs/laravel/v2/auth/plain/logging-in' },
                    { title: 'Laravel UI', href: '/docs/laravel/v2/auth/plain/laravel-ui' },
                    { title: 'Laravel Breeze', href: '/docs/laravel/v2/auth/plain/laravel-breeze' },
                    { title: 'Laravel Jetstream', href: '/docs/laravel/v2/auth/plain/laravel-jetstream' },
                ],
            },
            {
                title: 'Database Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v2/auth/database' },
                    { title: 'Installation', href: '/docs/laravel/v2/auth/database/installation' },
                    { title: 'Configuration', href: '/docs/laravel/v2/auth/database/configuration' },
                    { title: 'Logging In', href: '/docs/laravel/v2/auth/database/logging-in' },
                    { title: 'Importing Users', href: '/docs/laravel/v2/auth/database/importing' },
                    { title: 'Laravel UI', href: '/docs/laravel/v2/auth/database/laravel-ui' },
                    { title: 'Laravel Breeze', href: '/docs/laravel/v2/auth/database/laravel-breeze' },
                    { title: 'Laravel Jetstream', href: '/docs/laravel/v2/auth/database/laravel-jetstream' },
                    { title: 'Laravel Sanctum', href: '/docs/laravel/v2/auth/database/laravel-sanctum' },
                ],
            },
            {
                title: 'SSO Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v2/auth/sso' },
                    { title: 'Setup', href: '/docs/laravel/v2/auth/sso/setup' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Lumen', href: '/docs/laravel/v2/lumen' },
                    { title: 'Events', href: '/docs/laravel/v2/events' },
                    { title: 'Testing', href: '/docs/laravel/v2/testing' },
                    { title: 'Extending', href: '/docs/laravel/v2/extending' },
                    { title: 'Debugging', href: '/docs/laravel/v2/debugging' },
                    { title: 'Importing Objects', href: '/docs/laravel/v2/importing' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/laravel/v2/versioning' },
                    { title: 'License', href: '/docs/laravel/v2/license' },
                ],
            },
        ],
        v3: [
            {
                title: 'Prologue',
                links: [
                    { title: 'Release Notes', href: '/docs/laravel/v3/release-notes' },
                    { title: 'Upgrade Guide', href: '/docs/laravel/v3/upgrading' },
                ],
            },
            {
                title: 'Introduction',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v3' },
                    { title: 'Installation', href: '/docs/laravel/v3/installation' },
                    { title: 'Configuration', href: '/docs/laravel/v3/configuration' },
                    { title: 'Usage', href: '/docs/laravel/v3/usage' },
                ],
            },
            {
                title: 'Authentication',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v3/auth' },
                    { title: 'Multi-Domain', href: '/docs/laravel/v3/auth/multi-domain' },
                    { title: 'Restricting Login', href: '/docs/laravel/v3/auth/restricting-login' },
                    { title: 'Testing', href: '/docs/laravel/v3/auth/testing' },
                ],
            },
            {
                title: 'Plain Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v3/auth/plain' },
                    { title: 'Configuration', href: '/docs/laravel/v3/auth/plain/configuration' },
                    { title: 'Logging In', href: '/docs/laravel/v3/auth/plain/logging-in' },
                    { title: 'Laravel UI', href: '/docs/laravel/v3/auth/plain/laravel-ui' },
                    { title: 'Laravel Breeze', href: '/docs/laravel/v3/auth/plain/laravel-breeze' },
                    { title: 'Laravel Jetstream', href: '/docs/laravel/v3/auth/plain/laravel-jetstream' },
                ],
            },
            {
                title: 'Database Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v3/auth/database' },
                    { title: 'Installation', href: '/docs/laravel/v3/auth/database/installation' },
                    { title: 'Configuration', href: '/docs/laravel/v3/auth/database/configuration' },
                    { title: 'Logging In', href: '/docs/laravel/v3/auth/database/logging-in' },
                    { title: 'Importing Users', href: '/docs/laravel/v3/auth/database/importing' },
                    { title: 'Laravel UI', href: '/docs/laravel/v3/auth/database/laravel-ui' },
                    { title: 'Laravel Breeze', href: '/docs/laravel/v3/auth/database/laravel-breeze' },
                    { title: 'Laravel Jetstream', href: '/docs/laravel/v3/auth/database/laravel-jetstream' },
                    { title: 'Laravel Sanctum', href: '/docs/laravel/v3/auth/database/laravel-sanctum' },
                ],
            },
            {
                title: 'SSO Auth',
                links: [
                    { title: 'Overview', href: '/docs/laravel/v3/auth/sso' },
                    { title: 'Setup', href: '/docs/laravel/v3/auth/sso/setup' },
                ],
            },
            {
                title: 'Other Features',
                links: [
                    { title: 'Lumen', href: '/docs/laravel/v3/lumen' },
                    { title: 'Events', href: '/docs/laravel/v3/events' },
                    { title: 'Testing', href: '/docs/laravel/v3/testing' },
                    { title: 'Extending', href: '/docs/laravel/v3/extending' },
                    { title: 'Debugging', href: '/docs/laravel/v3/debugging' },
                    { title: 'Importing Objects', href: '/docs/laravel/v3/importing' },
                ],
            },
            {
                title: 'Extra',
                links: [
                    { title: 'Versioning', href: '/docs/laravel/v3/versioning' },
                    { title: 'License', href: '/docs/laravel/v3/license' },
                ],
            },
        ],
    },
};

// Utility function to get navigation for a specific package and version
export function getNavigation(packageName, version, isHomePage = false) {
    if (isHomePage) {
        return homeNavigation;
    }
    return navigationConfig[packageName]?.[version] || navigationConfig.core.v3;
}

// Utility function to get all available packages
export function getAvailablePackages() {
    return Object.keys(navigationConfig);
}

// Utility function to get all available versions for a package
export function getAvailableVersions(packageName) {
    return Object.keys(navigationConfig[packageName] || {});
}
