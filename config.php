<?php

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
    'githubApiToken' => '7b557ac1f9d00bca4b5e78bad0607c07916a5faf',

    // navigation menu
    'navigation' => require_once('navigation.php'),
    'laravelNavigation' => require_once('laravel.navigation.php'),

    // Thanks to: Caleb Porzio for these methods
    // https://github.com/livewire/docs
    'getNextPage' => function ($page, $navigation = 'navigation') {
        // Before: ['foo' => 'bar', 'baz' => ['children' => ['bob' => 'lob', 'law' => 'blog']]]
        $flattenedArrayOfPagesAndTheirLables = $page->{$navigation}->map(function ($value, $key) {
            $links = is_iterable($value) ? $value['children']->toArray() : [$key => $value];
            return collect($links)->map(function ($path, $label) {
                return ['path' => $path, 'label' => $label];
            });
        })->flatten(1);
        // After: [['label' => 'foo', 'path' => 'bar'], ['label' => 'bob', 'path' => 'lob'], ['label' => 'law', 'path' => 'blog']]
        $pathsByIndex = $flattenedArrayOfPagesAndTheirLables->pluck('path');
        $currentIndex = $pathsByIndex->search(trimPath($page->getPath()));
        $nextIndex = $currentIndex + 1;
        return $flattenedArrayOfPagesAndTheirLables[$nextIndex] ?? null;
    },
    'getPreviousPage' => function ($page, $navigation = 'navigation') {
        // Before: ['foo' => 'bar', 'baz' => ['children' => ['bob' => 'lob', 'law' => 'blog']]]
        $flattenedArrayOfPagesAndTheirLables = $page->{$navigation}->map(function ($value, $key) {
            $links = is_iterable($value) ? $value['children']->toArray() : [$key => $value];
            return collect($links)->map(function ($path, $label) {
                return ['path' => $path, 'label' => $label];
            });
        })->flatten(1);
        // After: [['label' => 'foo', 'path' => 'bar'], ['label' => 'bob', 'path' => 'lob'], ['label' => 'law', 'path' => 'blog']]
        $pathsByIndex = $flattenedArrayOfPagesAndTheirLables->pluck('path');
        $currentIndex = $pathsByIndex->search(trimPath($page->getPath()));
        $previousIndex = $currentIndex - 1;
        return $flattenedArrayOfPagesAndTheirLables[$previousIndex] ?? null;
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
        $uris = [
            'https://github.com/DirectoryTree/LdapRecord.com/blob/master/source',
            trim(str_replace($page->getFilename(), '', $page->getPath()), '/'),
            $page->getFilename().".".$page->getExtension()
        ];

        return implode('/', $uris);
    },
    'url' => function ($page, $path) {
        return Str::startsWith($path, 'http') ? $path : '/' . trimPath($path);
    },
];
