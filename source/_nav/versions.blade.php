<div class="mt-0 mr-0 mb-4 lg:mt-8 lg:mr-4 lg:mb-0">
    <p class="nav-menu__item text-gray-500 font-extrabold tracking-widest uppercase mb-2 mt-0 lg:mt-6">Version</p>
    
    <div class="inline-block relative w-full">
        <select class="block appearance-none w-full bg-white px-4 h-10 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            @foreach($versions as $version)
                <option value="{{ $version['url'] }}">{{ $version['name'] }}</option>
            @endforeach
        </select>
        
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
</div>