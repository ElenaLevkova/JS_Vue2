<template>
  <div id="app">
    <div :class="[$style.header]">
      <h1>My Personal Cost</h1>
    </div>
    <div class="wrapper">
      <AddButton @onClicked="onClickedAddPaymentForm" nameButton="Add Cost +" />
      <AddPaymentForm @addNewPayment="addNewPaymentData" :payFormVisible="formVisiblePaymentForm" :category-list="categoryList"/>
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
            :countPages="countPages"
            />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
//import moment from 'moment'
import AddButton from './components/AddButton.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import CategoryDisplay from './components/CategoryDisplay.vue'
import AddPaymentForm from './components/AddPaymentForm.vue'
import PaginationPage from './components/PaginationPage.vue'
import AddCategoryForm from './components/AddCategoryForm.vue'

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
          const items = [{...{id:0, page:this.page}, ...value}]
          console.log('addNewPaymentData', items)
          this.addDataToPaymentList(items)
           //return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
        },
        onClickedAddPaymentForm(){
          this.formVisiblePaymentForm = !this.formVisiblePaymentForm
        },
        onClickedAddCategoryForm(){
          this.formVisibleCategoryForm = !this.formVisibleCategoryForm
        },
        onPaginate(p){
          this.page = p
          this.fetchListData(this.page)
        },
        addNewCategory(value){
          this.addCategory(value)
        }
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
      countPages(){
        return this.getCountPages
      },
      paymentsListLength(){
        return this.getPaymentList.length
      },
      paymentsList(){
        return this.getPaymentList
      },
      curElements(){
        //const {count, page} = this
        //return this.paymentsList.slice(count * (page - 1), count * (page - 1) + count )
        console.log('filter', this.paymentsList.filter(el => el.page === this.page))
        return this.paymentsList.filter(el => el.page === this.page)
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
    }
}
</script>

<style lang="scss" scoped module>
.header{
  font-size: 20px;
}
</style>
