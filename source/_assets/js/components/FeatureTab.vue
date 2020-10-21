<template>
    <div class="hidden">
        <slot></slot>
    </div>
</template>

<style scoped>
pre {
    @apply .border-none;
}
</style>

<script>
    export default {
        props: ['name'],
    }
</script>