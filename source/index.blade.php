@extends('_layouts.master')

@section('body')
<div class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28 mb-12 sm:mb-16 md:mb-20 lg:mb-28 xl:mb-32">
    <div class="text-center">
        <h2 class="text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight sm:leading-normal font-semibold text-gray-900">
            <span class="font-light">A framework for </span>

            <br class="xl:hidden">

            <span class="text-gradient bg-gradient-l-purple-light inline-block">
                Rapid LDAP Integration
            </span>
        </h2>

        <p class="mt-3 max-w-md mx-auto text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            LdapRecord is a framework that helps you quickly integrate <br class="hidden xl:inline-block"> LDAP  into your <strong>PHP</strong> applications.
        </p>

        <div class="my-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <a href="/docs/installation/" title="{{ $page->siteName }} getting started" class="group hover:shadow-xl transform hover:-translate-y-2 rounded-md shadow lg:flex justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white bg-gradient-l-purple-light hover:text-white focus:outline-none focus:shadow-outline-indigo transition duration-75 ease-in-out md:py-4 md:text-lg md:px-10">
                Get started
                <span class="text-xl ml-1">→</span>
            </a>
        </div>

        <div class="mt-4 max-w-md mx-auto sm:flex sm:justify-center">
            <a href="https://github.com/sponsors/stevebauman" target="_blank" title="Support LdapRecord Link" class="group rounded-md lg:flex justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 shadow hover:shadow-none md:py-4 md:text-lg md:px-10">
                Sponsor LdapRecord <span class="text-xl ml-1">❤️</span>
            </a>
        </div>
    </div>
</div>

<div class="bg-gray-b-code hidden sm:block">
    <div class="pb-12 sm:pb-16">
        <div class="relative">
            <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-4xl mx-auto">
                    <div class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                        <a href="/docs/laravel/quickstart" class="rounded-tl-lg rounded-bl-lg">
                            <div class="border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r flex flex-col justify-between items-center h-full">
                                <div>
                                    <svg fill="none" viewBox="0 0 50 52" stroke="url(#svg-grad1)" class="w-10 h-20 mx-auto">
                                        <title>Logomark</title>
                                        <path
                                                d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z"
                                                fill="#FF2D20"
                                                fill-rule="evenodd"
                                        /></svg>
                                </div>

                                <p class="mt-2 text-lg leading-6 font-medium text-gray-800 hover:text-purple-700">
                                    Laravel Integration
                                </p>
                            </div>
                        </a>
                        <a href="/docs/">
                            <div class="border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                <div>
                                    <svg fill="none" viewBox="0 0 24 24" stroke="url(#svg-grad1)" class="w-10 h-20 mx-auto">
                                        <defs>
                                            <linearGradient id="svg-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stop-color="#7F00FF"></stop>
                                                <stop offset="1000%" stop-color="#E100FF"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>

                                <p class="mt-2 text-lg leading-6 font-medium text-gray-800 hover:text-purple-700">
                                    Framework
                                </p>
                            </div>
                        </a>
                        <a href="/docs/quickstart" class="rounded-tr-lg rounded-br-lg">
                            <div class="border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                <div>
                                    <svg fill="none" viewBox="0 0 24 24" stroke="url(#svg-grad1)" class="w-10 h-20 mx-auto">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>

                                <p class="mt-2 text-lg leading-6 font-medium text-gray-800 hover:text-purple-700">
                                    Quick Start
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
