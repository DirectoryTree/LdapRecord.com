@php $level = $level ?? 0 @endphp

<ul class="list-none m-0 {{ $level > 0 && count($items) > 1 ? 'border-l-4 border-purple-200' : '' }}">
    @foreach ($items as $label => $item)
        @include('_nav.menu-item')
    @endforeach
</ul>
