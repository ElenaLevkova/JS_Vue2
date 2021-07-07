<template>
<div class="payments-list">
    <div class="list">
        <div class="item" 
            v-for="(item, idx) in items" 
            :key="idx">
            {{ idx + 1 }} - {{ item }}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "CategoryDisplay",
    props: {
        items: {
            type: Array,
            default: ()=>[],
        }
    }
}
</script>

<style lang="scss" scoped>

</style>