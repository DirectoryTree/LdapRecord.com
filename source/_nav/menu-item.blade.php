@php
    $url = is_string($item) ? $item : $item->url;

    $navClasses = $page->isActive($url)
        ? 'font-semibold text-purple-600 p-2 border-l-4 border-purple-500 bg-gradient-to-r from-purple-100 to-transparent'
        : 'text-gray-600 pl-2';
@endphp

<li>
    @if($url)
        {{-- Menu item with URL--}}
        <a 
            href="{{ $page->url($url) }}"
            class="{{ $navClasses }} -ml-2 nav-menu__item my-2 hover:text-purple-500"
        >
            {{ $label }}
        </a>
    @else
        {{-- Menu item without URL--}}
        <p class="nav-menu__item text-gray-500 font-extrabold tracking-widest uppercase mb-2 {{ $first ? 'mt-0 lg:mt-6' : 'mt-6' }}">{{ $label }}</p>
    @endif

    @if (! is_string($item) && $item->children)
        {{-- Recursively handle children --}}
        @include('_nav.menu', ['items' => $item->children, 'level' => ++$level])
    @endif
</li>
