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

    // navigation menu
    'navigation' => require_once('navigation.php'),
    'laravelNavigation' => require_once('laravel.navigation.php'),

    // Thanks to: Caleb Porzio for these methods
    // https://github.com/livewire/docs
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
        return $page->isOnParent('/docs/laravel');
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
