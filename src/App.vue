<template>
  <v-app>
    <v-app-bar class="mb-3"
      app
      flat
    >
    <div class="text-h4 text-md-3">My personal costs</div>
      <v-spacer></v-spacer>

     
    </v-app-bar>

    <v-main>
      <!-- <router-view/> -->
      <v-row>
        <v-col cols="6">
          <v-dialog persistent v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on }">
             <v-btn 
              color="teal" 
              v-on="on" 
              @click="onClickedAddPaymentForm" 
              dark 
              class="mt-3 ml-3"  
              x-large
              >ADD NEW COST 
              <v-icon>mdi-plus</v-icon></v-btn>
              <!-- <AddButton v-on="on" @onClicked="onClickedAddPaymentForm" nameButton="Add Cost" />-->
            </template>
            <v-card>
              <ModalWindow v-if="modalWindowName" :settings="settings" @onCloseClickModal="onCloseClickModal" />
            </v-card>
          </v-dialog>
          <PaymentsDisplay :getPaymentList="curElements" />
          <PaginationPage 
            :lengthArr="paymentsList" 
            @changePage="onPaginate" 
            :perPage="count" 
            :page="page"
            
            />
        </v-col>
        <v-col cols="6">
          <Diagramma :categoryList="categoryList" :paymentsList="getPaymentList" />
        </v-col>
      </v-row>
      
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
//import moment from 'moment'
//import AddButton from './components/AddButton.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
//import CategoryDisplay from './components/CategoryDisplay.vue'
//import AddPaymentForm from './components/AddPaymentForm.vue'
import PaginationPage from './components/PaginationPage.vue'
//import AddCategoryForm from './components/AddCategoryForm.vue'
//import Router from 'vue-router'
import Diagramma from './components/Diagramma.vue'

export default {
  name: 'App',
  components: {
   // AddButton,
    PaymentsDisplay,
    //AddCategoryForm,
    //CategoryDisplay,
   // AddPaymentForm,
    PaginationPage,
    Diagramma,
    ModalWindow: ()=> import ('./components/ModalWindow.vue'),
  },
data(){
        return {
           // paymentsList: [],
            formVisiblePaymentForm:  false,
            formVisibleCategoryForm:  false,
            page: 1,
            count: 15,
            modalWindowName: '',
            settings: {},
            dialog: false
        }
    },
    methods: {
        ...mapMutations([
          'setPaymentsListData',
          'addDataToPaymentList',
          'addCategory'
        ]),
        ...mapActions({
          fetchListData: 'fetchData',
          fetchCategoryList: 'fetchCategoryList'
        }),  
        onClickedAddPaymentForm(){
          this.$modal.show('add', {
            header: 'Add My Cost', 
            compName: "AddPaymentForm", 
            category: this.categoryList,
            mode: 'add',
            
          })
        },
        onClickedAddCategoryForm(){
          this.formVisibleCategoryForm = !this.formVisibleCategoryForm
        },
        onPaginate(p){
          this.page = p
        },
        addNewCategory(value){
          this.addCategory(value)
        },
        onShown(settings){
          console.log('onShown', settings, this.settings)
          this.modalWindowName = settings.name
          this.settings = settings.settings
          console.log('onShown', this.settings)
        },
        onHide(){
          console.log('onHide')
          this.modalWindowName = ''
          this.settings = {}
          if (this.$route.name != null) {
            this.$router.go(-1)
          }

          console.log('onHide', this.modalWindowName, this.settings, this.$route)
        },
        onCloseClickModal(){
          console.log('this.dialog1', this.dialog)
          this.dialog = false
          console.log('this.dialog2', this.dialog)
        }
    },
    computed: {
        ...mapGetters([

          'getCountPages',
          'getPaymentList',
          'getCategoryList'
        ]),
      paymentsList(){
        console.log('paymentsList', this.getPaymentList)
        return this.getPaymentList
      },
      curElements(){
        console.log('curElements', this.paymentsList)
        const {count, page} = this
        console.log('curElements_', count, page, (count * (page - 1)), (count * (page - 1) + count ), this.paymentsList.slice(count * (page - 1), count * (page - 1) + count ))
        return this.paymentsList.slice(count * (page - 1), count * (page - 1) + count )
      },
      categoryList(){
        console.log('computed', this.getCategoryList)
        return this.getCategoryList
      }
    },
    created(){
        if(!this.fetchListData.length) {
        this.fetchListData()
      }
       this.fetchCategoryList()

 
      
      
    },
    mounted() {
      console.log('mounted', this.$route)
      this.$modal.EventBus.$on('show', this.onShown)
      this.$modal.EventBus.$on('hide', this.onHide)
      
    }
}
</script>
