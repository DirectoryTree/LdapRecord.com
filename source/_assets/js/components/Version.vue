<template>
    <a
        class="text-gray-700 font-semibold bg-gray-300 rounded py-1 px-2 shadow-sm hover:shadow-none"
        :href="url"
    >{{ version }}</a>
</template>

<script>

export default {
    props: {
        repository: String,
    },

    mounted() {
        this.load();
    },

    data() {
        return {
            url: '',
            version: '0.0',
        };
    },

    methods: {
        load() {
            axios('/versions.json').then(({data}) => {
                this.url = data[this.repository].html_url;
                this.version = data[this.repository].tag_name;
            });
        },
    }
}
</script>