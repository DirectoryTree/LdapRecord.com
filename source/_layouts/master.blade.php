<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="{{ $page->description ?? $page->siteDescription }}">

        <meta property="og:site_name" content="{{ $page->siteName }}" />
        <meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}" />
        <meta property="og:description" content="{{ $page->description ?? $page->siteDescription }}" />
        <meta property="og:url" content="{{ $page->getUrl() }}" />
        <meta property="og:image" content="{{ $page->['baseUrl'] }}/assets/img/logo.png" />
        <meta property="og:type" content="website" />

        <!-- Twitter Meta -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="{{ $page->['baseUrl'] }}/assets/img/logo.png" />
        <meta name="twitter:image:alt" content="{{ $page->siteName }}" />

        <!-- Favicons -->
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#805ad5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#805ad5" />

        @stack('meta')

        <title>{{ $page->siteName }}{{ $page->title ? ' | ' . $page->title : '' }}</title>
        <link rel="home" href="{{ $page->baseUrl }}" />
        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}" />

        @if ($page->docsearchApiKey && $page->docsearchIndexName)
            <link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" onload="this.onload=null;this.rel='stylesheet'"/>
        @endif

        <script src="{{ mix('js/main.js', 'assets/build') }}" defer></script>
        @stack('scripts')
    </head>
    <body class="antialiased font-sans bg-gradient-to-b from-gray-100 to-white">
        <main id="app" role="main">
            @include('_layouts.navigation')

            @yield('body')

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
        </main>
    </body>
</html>
