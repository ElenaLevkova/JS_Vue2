<template>
    <v-card elevation="0" class="pl-16 d-flex flex-column align-self-center" id="chart" width="600px">
        <v-card-title class="align-self-center" >Costs by categories</v-card-title>
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
    </v-card>
</template>

<script>

//import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue-apexcharts'

export default {
    name: "Diagramma",
    components: {
      apexchart: VueApexCharts,
    },
    props: {
        categoryList: {
            type: Array,
            default: ()=> [],
        },
        paymentsList: {
            type: Array,
            default: ()=> [],
        },
    },
    data() {
        return {
        series:[], //this.getData().map(item => item.value),
        chartOptions: {}
          }
    },
    methods: {
        getData() {
            const items = this.categoryList.map(item => {
                //console.log('getData', item, this.$store.getters.getSumValueByCategory(item))
                return {label: item, value: this.$store.getters.getSumValueByCategory(item)}
                })
            console.log('getData', items)
            return {ser: items.map(item => item.value), lab: items.map(item => item.label)}    
        }
    },
    computed: {

    },
    watch: {
        categoryList: function(newValue, oldValue) {
            console.log('watch', newValue, oldValue)
            const q = this.getData()
            console.log('q.lab', q.lab)
            this.chartOptions =  {
                chart: {
                    width: 580,
                    height: 580,
                    type: 'donut',
                },
                // title: {
                //     text: "Costs by categories"
                // },
                labels: q.lab
            }
            this.series = q.ser
        },
        paymentsList: function(newValue, oldValue) {
            console.log('watch paymentList', newValue, oldValue)
            const q = this.getData()
            console.log('q.lab', q.lab)
            this.chartOptions =  {
                chart: {
                    width: 580,
                    height: 580,
                    type: 'donut',
                },
                // title: {
                //     text: "Costs by categories"
                // },
                labels: q.lab
            }
            this.series = q.ser
        },
    }
    // mounted() {
    //     this.items = this.getData()
    // }
}
</script>