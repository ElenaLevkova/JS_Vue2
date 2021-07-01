<template>
  <div id="app">
    <div :class="[$style.header]">
      <h1>My Personal Cost</h1>
    </div>
    <div class="wrapper">
      <AddCostButton @addCostClicked="addCostClickedData" />
      <AddPaymentForm @addNewPayment="addNewPaymentData" :payFormVisible="payFormVisible"/>
      <br/>
      <PaymentsDisplay :items="paymentsList"/>
      <!-- <PaginationPage /> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AddCostButton from './components/AddCostButton.vue'
import PaymentsDisplay from './components/PaymentsDisplay.vue'
import AddPaymentForm from './components/AddPaymentForm.vue'
//import PaginationPage from './components/PaginationPage.vue'

export default {
  name: 'App',
  components: {
    AddCostButton,
    PaymentsDisplay,
    AddPaymentForm,
    //PaginationPage
  },
data(){
        return {
            paymentsList: [],
            payFormVisible:  false
        }
    },
    methods: {
        addNewPaymentData(value){
          this.paymentsList= [...this.paymentsList, value]
          return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
        },
        addCostClickedData(){
          this.payFormVisible = !this.payFormVisible
        },
        fetchData(){
            return [
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
                {
                    date: "12.03.2020",
                    category: "Food",
                    value: 180
                },
                {
                    date: "12.04.2020",
                    category: "Internet",
                    value: 100
                },
                {
                    date: "28.08.2019",
                    category: "Food",
                    value: 300
                },
                {
                    date: "11.03.2018",
                    category: "Sport",
                    value: 1400
                },
            ].sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
               
        }
    },
    created(){
        this.paymentsList = this.fetchData()
       
    }
}
</script>

<style lang="scss" scoped module>
.header{
  font-size: 20px;
}
</style>
