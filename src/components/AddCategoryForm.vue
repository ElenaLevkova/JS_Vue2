<template>
    <div v-if="categoryFormVisible">
        <div class="category-list">
            <input class="category-list_input" placeholder="Category" type="text" v-model.trim="category" />
            <button class="category-list_button" @click="onClick"> Save </button>
            <CategoryDisplay  :items="categoryList"/>
        </div>
    </div>
</template>

<script>
import CategoryDisplay from './CategoryDisplay.vue'

export default {
    name: "AddCategoryForm",
    components: {
        CategoryDisplay,
    },
    props: {
        categoryList: {
            type: Array,
            default: ()=>[],
        },
        categoryFormVisible: Boolean
    },
    data(){
        return {
            formVisible: false,
            category:''
        }
    },
    methods:{
         onClick(){
            console.log('addCategory',)
            this.$emit('addCategory', [this.category])
        },

    }
}
</script>

<style lang="scss" scoped>
    .category-list {
        width: 550px;
        outline: 2px solid rgb(156, 155, 155);
        padding: 15px;
        margin-bottom: 20px;
    }
    .category-list_input {
        margin-right: 10px;
        margin-bottom: 20px;
        width: 150px;
    }
</style>