<template>
    <div>
        <div class="bg-gray-400 flex rounded-t-md p-3 space-x-2">
            <div class="bg-red-600 rounded-full h-3 w-3"></div>
            <div class="bg-yellow-600 rounded-full h-3 w-3"></div>
            <div class="bg-green-600 rounded-full h-3 w-3"></div>
        </div>
        <div class="flex justify-between overflow-x-scroll">
            <feature-tab-header v-for="tab in tabs" :key="tab.index" :active="activeTab == tab.id" @click.native="activeTab = tab.id">
                {{ tab.name }}
            </feature-tab-header>
        </div>
        <div class="rounded-b-md bg-gray-100 overflow-hidden">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import FeatureTabHeader from './FeatureTabHeader';

    export default {
        component: {
            FeatureTabHeader,
        },

        data() {
            return {
                activeTab: 0,
                tabs: [],
            };
        },

        mounted() {
            this.$nextTick(() => {
                this.$slots.default.forEach((component, index) => {
                    if (typeof component.componentOptions === 'undefined') {
                        return;
                    }

                    this.tabs.push({
                        id: index,
                        name: component.componentOptions.propsData['name'],
                    });
                });

                this.selectTab(this.activeTab);
            });
        },

        watch: {
            activeTab(newValue, oldValue) {
                this.hideTab(oldValue);
                this.selectTab(newValue);
            },
        },

        methods: {
            selectTab(id) {
                this.activeTab = id;

                this.getTabSlotElementById(id).classList.toggle('hidden');
            },

            hideTab(id) {
                this.getTabSlotElementById(id).classList.toggle('hidden');
            },

            getTabSlotElementById(id) {
                return this.$slots.default[id].componentInstance.$el;
            },
        }
    }
</script>
