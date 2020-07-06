<?php

return [
    'Introduction' => [
        'children' => [
            'Quickstart' => 'docs/quickstart',
            'Overview' => 'docs',
            'Installation' => 'docs/installation',
            'Configuration' => 'docs/configuration',
            'Connections' => 'docs/connections',
        ],
    ],
    'Searching' => [
        'children' => [
            'Query Builder'=> 'docs/searching',
            'API (Available Methods)' => 'docs/searching-api',
        ],
    ],
    'Models' => [
        'children' => [
            'Getting Started' => 'docs/models',
            'Relationships' => 'docs/model-relationships',
            'Accessors & Mutators' => 'docs/model-mutators',
            'API (Available Methods)' => 'docs/model-api',
        ],
    ],
    'Active Directory' => [
        'children' => [
            'Users' => 'docs/active-directory/users',
            'Groups' => 'docs/active-directory/groups',
        ],
    ],
    'Other Features' => [
        'children' => [
            //'Adldap2 Migration' => 'docs/adldap2/migration',
            'Authentication' => 'docs/authentication',
            'Common Queries' => 'docs/common-queries',
            'Caching' => 'docs/caching',
            'Events' => 'docs/events',
            'Logging' => 'docs/logging',
            'Testing' => 'docs/testing',
        ],
    ],
    'Extra' => [
        'children' => [
            'Versioning' => 'docs/versioning',
            'Credits' => 'docs/credits',
            'License' => 'docs/license',
        ],
    ],
];
