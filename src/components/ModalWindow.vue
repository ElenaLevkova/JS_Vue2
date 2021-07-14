<template>
  <div class="wrapper">
      <div class="header">
          {{settings.header}}
      </div>
      <div class="id" v-if="settings.id">
         ID = {{settings.id}}
      </div>
      <div class="content">
          <component 
            :is="settings.compName" 
            :date="date"
            :categoryList="settings.category"
            :id="settings.id"
            :mode="settings.mode"
          />
      </div>
      <div class="footer">
         <button @click="onCloseClick">Close</button>
      </div>
  </div>
</template>

<script>

import AddPaymentForm from './AddPaymentForm.vue'
import ContextMenu from './ContextMenu.vue'
//import Auth from './Auth.vue'
export default {
    name: 'ModalWindow',
    components: {
        AddPaymentForm,
        ContextMenu
        //Auth
    },
    props: {
        settings: {
            type: Object
        }
    },
    data(){
        return {
            date: new Date()
        }
    },
    methods: {
        onCloseClick() {
            this.$modal.hide()
        },
        
    },
    mounted() {
       console.log('mount_modal', this.settings)
      
    },

}
</script>

<style scoped lang="scss">
.wrapper {
    padding: 20px;
    position: absolute;
    background: #e3e3e3;
    top: 0px
}

</style>