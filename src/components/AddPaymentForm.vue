<template>

    <!-- <div>
        <div class="payment-button">
            <button @click="payFormVisible=!payFormVisible"> Add Cost </button>
        </div>
        <template v-if="payFormVisible"> -->
            <div class="payment-form" v-if="payFormVisible">
                <input placeholder="Amout" type="number" v-model.number="value" />
                <input placeholder="Category" type="text" v-model.trim="category" />
                <input placeholder="Date" type="text" v-model.trim="date" />
                <button @click="onClick"> Save </button>
            </div>
        <!-- </template>
    </div> -->
</template>

<script>
import moment from 'moment'

export default {
    name: "AddPaymentForm",
    props: {
        payFormVisible:Boolean
    },
    data(){
        return {
            value: 0,
            category: '',
            date: '',
            //payFormVisible: false
        }
    },
    methods:{
        getCurrentDate(){
            const today= new Date()
            const d = today.getDate()
            const m = today.getMonth() + 1
            const y = today.getFullYear()
            return `${d}.${m}.${y}`
        },
        onClick(){
            const {value, category} = this
            const data = {
                date: this.date || moment(this.getCurrentDate()).format('DD.MM.YYYY'), 
                category,
                value
            }
            console.log(data)
            this.$emit('addNewPayment', data)
        },

    }
}
</script>

<style lang="scss" scoped>
    input {
        margin-right: 10px;
    }
</style>