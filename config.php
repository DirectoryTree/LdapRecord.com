<?php

use App\Router;
use App\Versions;
use App\DocumentPaginator;
use Illuminate\Support\Str;

return [
    'baseUrl' => 'https://ldaprecord.com',
    'production' => false,
    'siteName' => 'LdapRecord',
    'siteDescription' => "A PHP LDAP package made for humans.",

    // Algolia DocSearch credentials
    'docsearchApiKey' => 'bc526397341486f980ca0b7ee7a0fa61',
    'docsearchIndexName' => 'ldaprecord',

    'navigation' => [
        'core' => [
            'v1' => require_once('versions/core/v1/navigation.php'),
            'v2' => require_once('versions/core/v2/navigation.php'),
        ],
        'laravel' => [
            'v1' => require_once('versions/laravel/v1/navigation.php'),
            'v2' => require_once('versions/laravel/v2/navigation.php'),
        ],
    ],

    'route' => function ($page, $name, $params = []) {
        return Router::instance()->get($name, $params);
    },

    'getCurrentVersion' => function ($page, $repository = null) {
        $version = explode('/', $page->getRelativePath())[2] ?? null;

        return empty($version)
            ? $page->getLatestVersion($repository)
            : $version;
    },

    'getVersions' => function ($page, $repository = null) {
        return Versions::get($repository ?? $page->getCurrentRepository());
    },

    'getLatestVersion' => function ($page, $repository = null) {
        $repository = $repository ?? $page->getCurrentRepository();

        if ($nav = $page->navigation->{$repository}) {
            return $nav->reverse()->keys()->first();
        }
    },

    'getCurrentRepository' => function ($page) {
        return explode('/', $page->getRelativePath())[1] ?? null;
    },

    'getNextPage' => function ($page) {
        return (new DocumentPaginator($page))->getNext();
    },

    'getPreviousPage' => function ($page) {
        return (new DocumentPaginator($page))->getPrevious();
    },

    'getPrFilePath' => function ($page) {
        return implode('/', array_filter([
            $page->getFolderPath(),
            $page->getFullFilename(),
        ]));
    },

    'getFullFilename' => function ($page) {
        return implode('.', [$page->getFilename(), $page->getExtension()]);
    },

    'getFolderPath' => function ($page) {
        return explode('/', $page->getRelativePath())[3] ?? null;
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
        return $page->getRelativePath() ? false : true;
    },

    'isOnParent' => function ($page, $path) {
        return Str::startsWith(Str::start($page->getPath(), '/'), $path);
    },

    'isOnLaravel' => function ($page) {
        return $page->getCurrentRepository() === "laravel";
    },

    'pullRequestPath' => function ($page) {
        $uris = explode('/', $page->getPath());

        array_shift($uris);

        $path = implode('/', $uris);
        
        $file = implode('.', [$page->getFilename(), $page->getExtension()]);

        return implode([
            'https://github.com/DirectoryTree/LdapRecord-Docs/blob/master',
            $path.$file
        ]);
    },
    
    'url' => function ($page, $path) {
        return Str::startsWith($path, 'http') ? $path : '/' . trimPath($path);
    },
];
