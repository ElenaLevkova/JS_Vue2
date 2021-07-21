<template>
  <v-card class="d-flex flex-column">
    <v-btn @click="onEdit" class="align-self-baseline" plain><v-icon>mdi-square-edit-outline</v-icon> Редактировать</v-btn>
    <v-btn class="menu_delete align-self-baseline" plain @click="onDel"><v-icon>mdi-trash-can-outline</v-icon> Удалить</v-btn>
  </v-card>
 </template>

<script>

//import moment from 'moment';

export default {
    name: "ContextMenu",
    props: {
     id: Number
    },
    methods:{
        onEdit(){
          const cur_obj = {
            header: 'Edit My Cost', 
            compName: "AddPaymentForm", 
            id: this.id,
            category: this.categoryList,
            mode: 'edit'
          }
          console.log('cur_obj', cur_obj)
          this.$root.$children[0].dialog = true
            console.log('onEdit', this.id)
           this.$modal.show('edit', cur_obj)
        },
        onDel(){
            console.log('onDel', this.id)

            this.$store.commit('delDataToPaymentList',this.id)

          },
    },
    computed: {
        categoryList(){
        return this.$store.getters.getCategoryList
      }
    }
}
</script>

<!-- <style>
.context_menu {
    display: flex;
    flex-direction: row;
        width: 250px;
        outline: 2px solid rgb(156, 155, 155);
        padding: 15px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
.context_menu button{
        margin-right: 20px;
        width: 110px;
    }
</style> -->