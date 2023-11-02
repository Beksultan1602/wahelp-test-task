<template>
    <div @scroll="handleScroll" ref="container" style="height: 300px; overflow-y: auto; display: flex; flex-wrap: wrap; gap: 20px; max-width: 50%">
        <div v-for="item in visibleItems" :key="item.id" @click="moveToB(item)">
            <div>
                <p>{{ item.name }}</p>
                <p>Price: ${{ item.price.toFixed(2) }}</p>
                <p>Level: {{ item.level }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ContainerA",
    data() {
        return {
            visibleItems: [],
            itemsPerPage: 50,
            startIndex: 0,
        };
    },
    props: {
        items: Array
    },
    methods: {
        moveToB(item) {
            this.$emit('move-to-b', item);
            this.visibleItems = this.visibleItems.filter((i) => i.id !== item.id);
        },
        handleScroll() {
            const container = this.$refs.container;
            if (
                container.scrollTop + container.clientHeight >= container.scrollHeight
            ) {
                if (this.startIndex < this.items.length) {
                    const endIndex = this.startIndex + this.itemsPerPage;
                    this.visibleItems = this.visibleItems.concat(this.items.slice(this.startIndex, endIndex));
                    this.startIndex = endIndex;
                }
            }
        },
    },
    mounted() {
        this.handleScroll();
    },
}
</script>

<style scoped>

</style>