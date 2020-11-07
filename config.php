<?php

use App\PagePaginator;
use Illuminate\Support\Str;

return [
    'baseUrl' => 'https://ldaprecord.com',
    'production' => false,
    'siteName' => 'LdapRecord',
    'siteDescription' => "A PHP LDAP package made for humans.",

    // Algolia DocSearch credentials
    'docsearchApiKey' => 'bc526397341486f980ca0b7ee7a0fa61',
    'docsearchIndexName' => 'ldaprecord',

    // GitHub API token for getting new release versions
    'githubApiToken' => '12622c742b29bfdd5ef03f59d4856bf51db773da',

    'navigation' => [
        'core' => [
            'v1' => require_once('versions/core/v1/navigation.php'),
            // 'v2' => require_once('versions/core/v2/navigation.php'),
        ],
        'laravel' => [
            'v1' => require_once('versions/laravel/v1/navigation.php'),
            // 'v2' => require_once('versions/laravel/v2/navigation.php'),
        ],
    ],

    'getCurrentVersion' => function ($page, $repository = null) {
        $version = explode('/', $page->getRelativePath())[2] ?? null;

        if (! empty($version)) {
            $version;
        }

        return $page->getLatestVersion($repository);
    },

    'getLatestVersion' => function ($page, $repository = null) {
        $currentRepo = $repository ?? $page->getCurrentRepository();

        if ($nav = $page->navigation->{$currentRepo}) {
            return $nav->reverse()->keys()->first();
        }
    },

    'getCurrentRepository' => function ($page) {
        return explode('/', $page->getRelativePath())[1] ?? null;
    },

    'getNextPage' => function ($page, $navigation = 'navigation') {
        return (new PagePaginator($page, $navigation))->getNext();
    },

    'getPreviousPage' => function ($page, $navigation = 'navigation') {
        return (new PagePaginator($page, $navigation))->getPrevious();
    },

    'isActive' => function ($page, $path) {
        return Str::endsWith(trimPath($page->getPath()), trimPath($path));
    },

    'isActiveParent' => function ($page, $menuItem) {
        if (is_object($menuItem) && $menuItem->children) {
            return $menuItem->children->contains(function ($child) use ($page) {
                return trimPath($page->getPath()) == trimPath($child);
            });
        }
    },

    'isHomePage' => function ($page) {
        return $page->isActive('/');
    },

    'isOnParent' => function ($page, $path) {
        return Str::startsWith(Str::start($page->getPath(), '/'), $path);
    },

    'isOnLaravel' => function ($page) {
        return $page->getCurrentRepository() === "laravel";
    },

    'pullRequestPath' => function ($page) {
        $uri = 'https://github.com/DirectoryTree/LdapRecord-Docs/blob/master';

        $path = str_replace($page->getFilename(), '', str_replace('docs/', '', $page->getPath()));

        $file = $page->getFilename().".".$page->getExtension();

        return implode([$uri, $path.$file]);
    },
    
    'url' => function ($page, $path) {
        return Str::startsWith($path, 'http') ? $path : '/' . trimPath($path);
    },
];
