@extends('_layouts.master')

@section('nav-toggle')
    @include('_nav.menu-toggle')
@endsection

@section('body')
    <section class="container relative max-w-8xl mx-auto p-0 md:px-6">
        <div class="flex flex-col lg:flex-row justify-center mt-0 lg:mt-6">
            <nav id="js-nav-menu" class="nav-menu relative hidden lg:block md:rounded-b">
                @yield('nav')
            </nav>

            <div class="DocSearch-content content w-full h-full lg:w-3/5 bg-white break-words rounded-none md:rounded-lg shadow-none md:shadow mt-0 md:mt-6 px-6 pt-6 md:pt-8 md:pb-16 md:px-10" v-pre>
                @if($page->getCurrentVersion() !== ($latest = $page->getLatestVersion()))
                    <div class="bg-yellow-100 border border-yellow-500 rounded text-yellow-900 px-4 py-3" role="alert">
                        <div class="flex">
                            <div class="py-1">
                                <svg class="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                            <div>
                                <p class="font-bold m-0">You're browsing old documentation.</p>
                                
                                <p class="text-sm m-0">
                                    A new major version is available. Consider upgrading to
                                    
                                    @if($page->getCurrentRepository() == 'laravel')
                                        <strong>
                                            <a href="/docs/laravel/{{ $latest }}/">LdapRecord-Laravel {{ $latest }}</a>
                                        </strong>
                                    @else
                                        <strong>
                                            <a href="/docs/core/{{ $latest }}/">LdapRecord {{ $latest }}</a>
                                        </strong>.
                                    @endif
                                </p>
                            </div>
                        </div>
                    </div>
                @endif
                
                @yield('content')

                <div class="mt-12 pt-8 pb-6">
                    @php
                    $next = $page->getNextPage();
                    $prev = $page->getPreviousPage();
                    @endphp

                    <div class="flex flex-col-reverse md:flex-row justify-between items-center">
                        <div class="flex flex-col items-center md:items-start">
                            @if($prev)
                                <span class="font-bold text-gray-500 text-sm tracking-wider uppercase pb-1">← Previous Topic</span>

                                <h4 class="font-bold underline m-0 text-blue-700">
                                    <a href="/{{ $prev['path'] }}">{!! $prev['label'] !!}</a>
                                </h4>
                            @endif
                        </div>
                        
                        <div class="mb-8 md:mb-0 flex flex-col items-center md:items-end">
                            @if($next)
                                <span class="font-bold text-gray-500 text-sm tracking-wider uppercase pb-1">Next Topic →</span>

                                <h4 class="font-bold underline m-0 text-blue-700">
                                    <a href="/{{ $next['path'] }}">{!! $next['label'] !!}</a>
                                </h4>
                            @endif
                        </div>
                    </div>
                </div>

                <div class="mt-8 text-center hidden md:block">
                    <a
                        class="font-bold text-gray-500 text-sm tracking-wider uppercase"
                        href="{{
                            $page->route('docs.pr', [
                                $page->getCurrentRepository(),
                                $page->getCurrentVersion(),
                                $page->getPrFilePath(),
                            ])
                        }}"
                        target="_blank"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-6 h-6 inline-block fill-current mr-1">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                        </svg>

                        Edit this Page
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection
