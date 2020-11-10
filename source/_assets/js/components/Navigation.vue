<template>
    <div class="flex flex-1 justify-end items-center text-right md:pl-10 text-gray-800">
        <button
               title="Start searching"
               type="button"
               class="flex md:hidden bg-gray-100 hover:bg-blue-100 justify-center items-center rounded-lg focus:outline-none h-10 px-3 shadow"
               v-on:click="this.toggle"
        >
           <img src="/assets/img/magnifying-glass.svg" alt="search icon" class="h-4 w-4 max-w-none">
        </button>

        <div id="js-search-input" class="docsearch-input__wrapper hidden md:block">
           <label for="search" class="hidden">Search</label>

           <input
                   id="docsearch-input"
                   class="docsearch-input block h-10 transition-fast w-full lg:w-1/2 xl:w-1/3 outline-none rounded-lg text-gray-700 focus:border-blue-400 ml-auto px-4 pb-0 border shadow md:shadow-none"
                   name="docsearch"
                   type="text"
                   placeholder="Search"
           >

           <button
                   class="md:hidden absolute right-0 top-0 mr-8 h-full font-light text-3xl text-blue-500 hover:text-blue-600 focus:outline-none -mt-px"
                   v-on:click="this.toggle"
           >&times;</button>
        </div>

        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            apiKey: String,
            index: String
        },

        data() {
            return {
                search: null
            }
        },

        mounted() {
            this.search = docsearch({
                apiKey: this.apiKey,
                indexName: this.index,
                inputSelector: '#docsearch-input',
                debug: false // Set debug to true if you want to inspect the dropdown
            });
        },

        methods: {
            toggle() {
                const menu = document.getElementById('js-search-input');
                menu.classList.toggle('hidden');
                menu.classList.toggle('md:block');
                document.getElementById('docsearch-input').focus();
            },
        }
    }
</script>
