<template>

    <!-- <div>
        <div class="payment-button">
            <button @click="payFormVisible=!payFormVisible"> Add Cost </button>
        </div>
        <template v-if="payFormVisible"> -->
            <div class="payment-form" v-if="payFormVisible">
                <input class="payment-form__input" placeholder="Amout" type="number" v-model.number="value" />
                <!-- <input placeholder="Category" type="text" v-model.trim="category" /> -->
                <select class="payment-form__input"   v-model="category">
                    <option v-for="(item, idx) in categoryList" :value="item" :key="idx">
                        {{item}}
                    </option>
                </select>
                <input class="payment-form__input"  placeholder="Date" type="text" v-model.trim="date" />
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
        payFormVisible:Boolean,
        categoryList:Array
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
    .payment-form {
        width: 550px;
        outline: 2px solid rgb(156, 155, 155);
        padding: 15px;
        margin-bottom: 20px;
    }
    .payment-form__input {
        margin-right: 10px;
        width: 150px;
    }
</style>