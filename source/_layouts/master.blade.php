<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="{{ $page->description ?? $page->siteDescription }}">

        <meta property="og:site_name" content="{{ $page->siteName }}"/>
        <meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}"/>
        <meta property="og:description" content="{{ $page->description ?? $page->siteDescription }}"/>
        <meta property="og:url" content="{{ $page->getUrl() }}"/>
        <meta property="og:image" content="/assets/img/logo.png"/>
        <meta property="og:type" content="website"/>

        <!-- Twitter Meta -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="/assets/img/logo.png">
        <meta name="twitter:image:alt" content="{{ $page->siteName }}">

        <!-- Favicons -->
        <link rel="icon" href="/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6b46c1">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        @stack('meta')

        <title>{{ $page->siteName }}{{ $page->title ? ' | ' . $page->title : '' }}</title>
        <link rel="home" href="{{ $page->baseUrl }}">
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">

        @if ($page->docsearchApiKey && $page->docsearchIndexName)
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
        @endif

        <script src="{{ mix('js/main.js', 'assets/build') }}" defer></script>
        @stack('scripts')
    </head>
    <body class="antialiased font-sans">
        <main id="app" role="main">
            <nav class="flex items-center h-24 py-12 z-20 border-gradient-l-purple-light {{ $page->isHomePage() ? '' : 'border-b-8 mb-2' }}" role="banner">
                <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
                    <div class="flex items-center">
                        <a href="/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                            <img class="h-20 md:h-24 mr-3" src="/assets/img/logo.svg" alt="{{ $page->siteName }} logo" />
                        </a>

                        @if($page->isOnLaravel())
                            <version repository="LdapRecord-Laravel"></version>
                        @else
                            <version repository="LdapRecord"></version>
                        @endif
                    </div>

                    <div class="flex flex-1 justify-end items-center text-right md:pl-10 text-gray-800">
                        <navigation api-key="{{ $page->docsearchApiKey }}" index="{{ $page->docsearchIndexName }}">
                            @if($page->isOnLaravel())
                                <a href="/docs/" class="ml-6 hidden md:inline whitespace-no-wrap text-gray-800 hover:text-purple-700" title="LdapRecord Documentation Link">
                                    {{ $page->isOnLaravel() ? 'Core Docs' : 'Docs' }}
                                </a>

                                <a href="https://github.com/DirectoryTree/LdapRecord-Laravel" class="hidden text-gray-800 hover:text-purple-700 sm:inline">
                                    <svg class="fill-current w-8 ml-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>GitHub</title><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path></svg>
                                </a>
                            @else
                                @if($page->isHomePage())
                                    <a href="/docs/" class="ml-6 hidden md:inline whitespace-no-wrap text-gray-800 hover:text-purple-700" title="LdapRecord-Laravel Documentation Link">
                                        Docs
                                    </a>
                                @endif

                                <a href="/docs/laravel" class="ml-6 hidden md:inline whitespace-no-wrap text-gray-800 hover:text-purple-700" title="LdapRecord-Laravel Documentation Link">
                                    Laravel Docs
                                </a>

                                <a href="https://github.com/DirectoryTree/LdapRecord" class="hidden md:inline text-gray-800 hover:text-purple-700">
                                    <svg class="fill-current w-8 ml-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>GitHub</title><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path></svg>
                                </a>
                            @endif
                        </navigation>
                    </div>
                </div>

                @yield('nav-toggle')
            </nav>

            <div class="w-full">
                <div class="relative h-full max-w-screen-xl mx-auto">
                    @if($page->isHomePage())
                        <svg style="right:100%;" width="404" height="784" fill="none" viewBox="0 0 404 784" class="absolute hidden sm:block transform -translate-y-8 translate-x-1/4 lg:translate-x-1/2">
                            <defs>
                                <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" fill="currentColor" class="text-gray-200"></rect>
                                </pattern>
                            </defs>
                            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"></rect>
                        </svg>
                    @else
                        <svg style="left:100%;" width="404" height="784" fill="none" viewBox="0 0 404 784" class="absolute hidden sm:block transform translate-y-64 -translate-x-64">
                            <defs>
                                <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" fill="currentColor" class="text-gray-200"></rect>
                                </pattern>
                            </defs>
                            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"></rect>
                        </svg>
                    @endif
                </div>

                @yield('body')
            </div>

            @if($page->isHomePage())
                <footer class="text-center text-sm pt-24 mt-auto" role="contentinfo">
                    <ul class="flex flex-col md:flex-row justify-center list-none text-gray-600">
                        <li class="md:mr-2">
                            &copy; <a href="https://github.com/DirectoryTree" title="DirectoryTree GitHub" class="whitespace-no-wrap text-gray-800 hover:text-purple-700">DirectoryTree</a> {{ date('Y') }}.
                        </li>

                        <li class="md:mr-2">
                            Built with <a href="http://jigsaw.tighten.co" title="Jigsaw by Tighten" class="whitespace-no-wrap text-gray-800 hover:text-purple-700">Jigsaw</a>
                            and <a href="https://tailwindcss.com" title="Tailwind CSS, a utility-first CSS framework" class="whitespace-no-wrap text-gray-800 hover:text-purple-700">Tailwind CSS</a>.
                        </li>
                    </ul>
                </footer>
            @endif
        </main>
    </body>
</html>
