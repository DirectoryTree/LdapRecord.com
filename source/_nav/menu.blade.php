@php $level = $level ?? 0 @endphp

<ul class="list-none md:sticky md:top-0 m-0 mr-0 lg:mr-1 {{ $level > 0 && count($items) > 1 ? '' : '' }}">
    @foreach ($items as $label => $item)
        @include('_nav.menu-item', ['first' => $loop->first])
    @endforeach
</ul>
