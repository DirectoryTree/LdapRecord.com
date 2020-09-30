@php $level = $level ?? 0 @endphp

<ul class="list-none m-0 {{ $level > 0 && count($items) > 1 ? '' : '' }}">
    @foreach ($items as $label => $item)
        @include('_nav.menu-item', ['first' => $loop->first])
    @endforeach
</ul>
