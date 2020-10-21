<template>
    <div class="flex flex-grow whitespace-no-wrap justify-between items-center px-4 py-1 cursor-pointer" :class="active ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-300 hover:bg-gray-400'">
        <div class="text-gray-500 hover:text-gray-600 font-bold">&times;</div>
        <div class="flex-fill ml-4 text-gray-800 text-center flex-grow text-sm">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['active']
    }
</script>