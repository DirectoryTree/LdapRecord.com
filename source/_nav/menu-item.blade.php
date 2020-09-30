@php($url = is_string($item) ? $item : $item->url)
<li class=" {{ $page->isActive($url) ? '' : '' }}">
    @if($url)
        {{-- Menu item with URL--}}
        <a href="{{ $page->url($url) }}"
            class="{{ 'lvl' . $level }} {{ $page->isActiveParent($item) ? 'lvl' . $level . '-active' : '' }} {{ $page->isActive($url) ? 'active font-semibold text-purple-600' : 'text-gray-600' }} nav-menu__item my-2 p-0 hover:text-purple-500"
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
