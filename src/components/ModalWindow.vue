<!-- <template>
  <div class="wrapper">
      <v-card class=" d-flex flex-row justify-space-between " color="#e3e3e3">
      <div class="header text-h5 text-md-3 pa-3">
          {{settings.header}}
      </div>
     
         <v-btn class="mt-n2 mr-n5" large  plain @click="onCloseClick"><v-icon>mdi-close</v-icon></v-btn>
      
      </v-card>
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
      
  </div>
</template>-->
<template>
        <v-card>
          <v-card-title  class=" d-flex flex-row justify-space-between ">
            <span class="text-h5"> {{settings.header}}</span>
            <v-card-actions>
             <v-btn class="mt-n2 mr-n5" large  plain @click="onCloseClick" @onSaveClickForm="onCloseClick"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-actions>
          </v-card-title>
          <v-card-text>
            <v-container>
              <component 
            :is="settings.compName" 
            :date="date"
            :categoryList="settings.category"
            :id="settings.id"
            :mode="settings.mode"
            
          />
          </v-container>
            </v-card-text> 
        </v-card>
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
             console.log('onCloseClick')
            // this.settings.dialog = false
            this.$modal.hide()
            this.$emit('onCloseClickModal')
        },
        
    },
    mounted() {
       console.log('mount_modal', this.settings)
      
    },

}
</script>

<style scoped lang="scss">
// .wrapper {
//     //padding: 20px;
//     position: absolute;
//     background: #e3e3e3;
//     top: 0px
// }

</style>