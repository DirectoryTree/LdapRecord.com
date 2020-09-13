@extends('_layouts.docs')

@section('nav')
    @include('_nav.menu', ['items' => $page->navigation])

    <div class="block md:hidden">
        <hr class="my-4"/>

        <ul class="list-none m-0">
            <li class="p-0">
                <a href="/docs/laravel/"
                   class="nav-menu__item text-gray-600 my-2 last:mb-4 p-0 hover:text-purple-500"
                >
                    Laravel Documentation
                </a>
            </li>

            <li class="p-0">
                <a href="https://github.com/DirectoryTree/LdapRecord"
                   class="nav-menu__item text-gray-600 my-2 last:mb-4 p-0 hover:text-purple-500"
                >
                    Source Code
                </a>
            </li>
        </ul>
    </div>
@endsection

@section('footer')
    @include('_nav.primary-footer-links', ['items' => $page->navigation])
@endsection
