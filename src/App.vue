<template>
  <div id="app">
    <div :class="[$style.header]">
      <h1>My Personal Cost</h1>
    </div>
    <div class="wrapper">
      <router-link to="/add/payment/Food?value=200" >Завести строку Food значением 200</router-link>
      <br>
      <router-link to="/add/payment/Transport?value=50" >Завести строку Transport значением 50</router-link>
      <br>
      <router-link to="/add/payment/0?value=0" >Сбросить значения в форме ввода</router-link>
      <br>
      <router-link to="/add/payment/?value=" >Закрыть форму ввода</router-link>
      <br>
      <!-- <router-view></router-view> -->
      <!-- <a href="/add/payment/Food?value=200"  v-on:submit.prevent>/add/payment/Food?value=200</a> -->
      
      <!-- <a href="/add/payment/Transport?value=50" @click="onclickRouter"   >/add/payment/Transport?value=50</a> -->
      <router-view ></router-view>
      <AddButton @onClicked="onClickedAddPaymentForm" nameButton="Add Cost +" />
      <AddPaymentForm  
        v-if="formVisiblePaymentForm" 
        @addNewPayment="addNewPaymentData" 
        :category-list="categoryList"
        :payFormByButton="true"
        />
      
      <br/>
      <AddButton @onClicked="onClickedAddCategoryForm" nameButton="Add Category +" />
      <AddCategoryForm @addCategory="addNewCategory" :categoryList="categoryList" :categoryFormVisible="formVisibleCategoryForm" />
      <PaymentsDisplay :getPaymentList="curElements"/>
      <CategoryDisplay v-show="false" :items="categoryList"/>
      <PaginationPage 
            :lengthArr="paymentsList" 
            @changePage="onPaginate" 
            :perPage="count" 
            :page="page"
            
            />
    </div>
    
  </div>
  
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import AddButton from './components/AddButton.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import CategoryDisplay from './components/CategoryDisplay.vue'
import AddPaymentForm from './components/AddPaymentForm.vue'
import PaginationPage from './components/PaginationPage.vue'
import AddCategoryForm from './components/AddCategoryForm.vue'
//import Router from 'vue-router'

export default {
  name: 'App',
  components: {
    AddButton,
    PaymentsDisplay,
    AddCategoryForm,
    CategoryDisplay,
    AddPaymentForm,
    PaginationPage
  },
data(){
        return {
           // paymentsList: [],
            formVisiblePaymentForm:  false,
            formVisibleCategoryForm:  false,
            page: 1,
            count: 5,
        }
    },
    methods: {
        ...mapMutations([
          'setPaymentsListData',
          'addDataToPaymentList',
          'addCategory'
        ]),
        ...mapActions({
          fetchListData: 'fetchData'
        }),  
        addNewPaymentData(value){
          const items = [{...{id:0,}, ...value}]
          console.log('addNewPaymentData', value)
          this.addDataToPaymentList(items)
           return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
        },
        onClickedAddPaymentForm(){
          this.formVisiblePaymentForm = !this.formVisiblePaymentForm
        },
        onClickedAddCategoryForm(){
          this.formVisibleCategoryForm = !this.formVisibleCategoryForm
        },
        onPaginate(p){
          this.page = p
          //this.fetchListData()
        },
        addNewCategory(value){
          this.addCategory(value)
        },
        // onclickRouter(event){
          
        //   console.log('onclickRouter', this.$route)
        //   console.log('formVisiblePaymentForm', this.formVisiblePaymentForm )
        //   if (this.formVisiblePaymentForm === false) this.formVisiblePaymentForm = true
        //   event.preventDefault()
        // }
        // fetchData(){
        //     return [
        //         {
        //             date: "12.03.2020",
        //             category: "Food",
        //             value: 180
        //         },
        //         {
        //             date: "12.04.2020",
        //             category: "Internet",
        //             value: 100
        //         },
        //         {
        //             date: "28.08.2019",
        //             category: "Food",
        //             value: 300
        //         },
        //         {
        //             date: "12.03.2020",
        //             category: "Food",
        //             value: 180
        //         },
        //         {
        //             date: "12.04.2020",
        //             category: "Internet",
        //             value: 100
        //         },
        //         {
        //             date: "28.08.2019",
        //             category: "Food",
        //             value: 300
        //         },
       
        //     ].sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
               
        // },
       
        
    },
    computed: {
        ...mapGetters([
        //'getFullPaymentValue',
          'getCountPages',
          'getPaymentList',
          'getCategoryList'
        ]),
        // getFPV(){
        //     return this.getFullPaymentValue
        // },
      // countPages(){
      //   return this.getCountPages
      // },
      // paymentsListLength(){
      //   return this.getPaymentList.length
      // },
      paymentsList(){
        console.log('paymentsList', this.getPaymentList)
        return this.getPaymentList
      },
      curElements(){
        console.log('curElements', this.paymentsList)
        const {count, page} = this
        console.log('curElements_', count, page, (count * (page - 1)), (count * (page - 1) + count ), this.paymentsList.slice(count * (page - 1), count * (page - 1) + count ))
        return this.paymentsList.slice(count * (page - 1), count * (page - 1) + count )
        
        // console.log('filter', this.paymentsList.map(el => el.page === this.page), this.paymentsList["page"], this.page)
        // return this.paymentsList.filter(el =>  { console.log(el.page) 
        //                             return el.page === this.page})
      },
      categoryList(){
        return this.getCategoryList
      }
    },
    created(){
        //this.paymentsList = this.fetchData()
        if(!this.fetchListData.length) {
        this.fetchListData()
      }
       this.$store.dispatch('fetchCategoryList')
    },
    mounted() {
      console.log('mounted', this.$route)
    }
}
</script>

<style lang="scss" scoped module>
.header{
  font-size: 20px;
}
</style>
