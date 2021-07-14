<template>
  <div class="context_menu-id"> 
      <!-- <p>ID = {{id}}</p> -->
      <div class="context_menu">
        <button  @click="onEdit"> Редактировать </button>
        <button  @click="onDel"> Удалить </button>
      </div>
  </div>
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
            console.log('onEdit', this.id)
            this.$modal.show('edit', {
            header: 'Edit My Cost', 
            compName: "AddPaymentForm", 
            id: this.id,
            category: this.categoryList,
            mode: 'edit'
          })
        },
        onDel(){
            console.log('onDel', this.id)

            this.$store.commit('delDataToPaymentList',this.id)
            //return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
             this.$modal.hide()
          },
    },
    computed: {
        categoryList(){
        return this.$store.getters.getCategoryList
      }
    }
}
</script>

<style>
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
</style>