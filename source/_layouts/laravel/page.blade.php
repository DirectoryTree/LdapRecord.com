@extends('_layouts.docs')

@php($versions = $page->getVersions())
@php($navigation = $page->navigation->{"laravel"}->{$page->getCurrentVersion("laravel")})

@section('nav')
    @include('_nav.versions', ['versions' => $versions])

    @include('_nav.menu', ['items' => $navigation])

    <div class="block sm:hidden">
        <hr class="my-4"/>

        <ul class="list-none m-0">
            <li class="p-0">
                <a
                    href="{{ $page->route('docs.core', ['version' => $page->getLatestVersion('core')]) }}"
                    class="nav-menu__item text-gray-600 my-2 last:mb-4 p-0 hover:text-purple-500"
                >
                    Core Documentation
                </a>
            </li>

            <li class="p-0">
                <a
                    href="{{ $page->route('docs.laravel.source') }}"
                    class="nav-menu__item text-gray-600 my-2 last:mb-4 p-0 hover:text-purple-500"
                >
                    Source Code
                </a>
            </li>
        </ul>
    </div>
@endsection
