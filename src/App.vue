<template>
    <div style="display: flex; gap: 20px;">
        <ContainerA :items="containerAItems" @move-to-b="moveToB" />
        <ContainerB :items="containerBItems" @move-to-a="moveToA" />
    </div>
</template>

<script>
import ContainerA from "@/components/ContainerA";
import ContainerB from "@/components/ContainerB";
import items from './data/generate'
import itemsB from './data/generateB'
export default {
    name: "App",
    components: {ContainerB, ContainerA},
    data() {
        return {
            items,
            itemsB,
            containerAItems: [],
            containerBItems: []
        }
    },
    created() {
        this.containerBItems = itemsB
        this.containerAItems = items
    },
    methods: {
        moveToB(item) {
            this.containerAItems = this.containerAItems.filter((i) => i.id !== item.id);
            this.containerBItems.push(item);
        },
        moveToA(item) {
            this.containerBItems = this.containerBItems.filter((i) => i.id !== item.id);
            this.containerAItems.push(item);
        },
    }
};
</script>

<style lang="scss">
.app {
}
</style>
