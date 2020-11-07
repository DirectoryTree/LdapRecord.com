<nav class="flex items-center h-24 py-12 z-20 bg-white border-gradient-l-purple-light border-b-8" role="banner">
    <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
        <div class="flex items-center">
            <a href="/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                <img class="h-20 md:h-24 mr-3" src="/assets/img/logo.svg" alt="{{ $page->siteName }} logo" />
            </a>
        </div>

        <div class="flex flex-1 justify-end items-center text-right md:pl-10 text-gray-800">
            <navigation api-key="{{ $page->docsearchApiKey }}" index="{{ $page->docsearchIndexName }}">
                @if($page->isOnLaravel())
                    <x-menu-link href="/docs/core/{{ $page->getCurrentVersion() }}" title="LdapRecord Documentation Link">
                        {{ $page->isOnLaravel() ? 'Core Docs' : 'Docs' }}
                    </x-menu-link>

                    <a href="https://github.com/DirectoryTree/LdapRecord-Laravel" class="hidden text-gray-800 hover:text-purple-700 sm:inline">
                        <svg class="fill-current w-8 ml-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>GitHub</title><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path></svg>
                    </a>
                @else
                    @if($page->isHomePage())
                        <x-menu-link href="/docs/core/{{ $page->getCurrentVersion() }}" title="LdapRecord-Laravel Documentation Link">
                            Docs
                        </x-menu-link>
                    @endif

                    <x-menu-link href="/docs/laravel/{{ $page->getCurrentVersion() }}" title="LdapRecord-Laravel Documentation Link">
                        Laravel Docs
                    </x-menu-link>

                    <x-github-link url="https://github.com/DirectoryTree/LdapRecord" class="hidden md:inline text-gray-800 hover:text-purple-700"></x-github-link>
                @endif
            </navigation>
        </div>
    </div>

    @yield('nav-toggle')
</nav>