<template>

    <!-- <div>
        <div class="payment-button">
            <button @click="payFormVisible=!payFormVisible"> Add Cost </button>
        </div>
        <template v-if="payFormVisible"> -->
            <div class="payment-form"> 
                <input class="payment-form__input"  placeholder="Date" type="text" v-model.trim="date" />
                <!-- <input placeholder="Category" type="text" v-model.trim="category" /> -->
                <select class="payment-form__input"   v-model="category">
                    <option v-for="(item, idx) in categoryList" :value="item" :key="idx">
                        {{item}}
                    </option>
                </select>
                <input class="payment-form__input" placeholder="Amout" type="number" v-model.number="value" />
                <button v-if="payFormByButton" @click="onClick"> Save </button>
            </div>
        <!-- </template>
    </div> -->
</template>

<script>
//import moment from 'moment';



export default {
    name: "AddPaymentForm",
    props: {
        payFormByButton: {
            type: Boolean,
            default: false,
        },
        categoryList: {
            type: Array,
            default: ()=> [],
        }
    },
    data(){
        return {
            value: this.setValue(),
            category: this.setCategory(),
            date: this.setDate(),
            data:{}
           
           
            //payFormVisible: true
        }
    },
    methods:{
        setValue() {
            if (this.payFormByButton) {return 0}
            else {
                console.log('setValue',this.$route.query.value)
                return Number(this.$route.query.value)
                }
        },
        setCategory () {
            console.log('setCategory', this.$route.path)
            if (this.payFormByButton) ''
            else
            {
                this.categoryList.push(this.$route.path.split('/')[3]); 
                return this.$route.path.split('/')[3]
            }
        }, 
        setDate() {
            if (this.payFormByButton) {
                return this.date
            }
            else
            {console.log('setDate', this.getCurrentDate());
                return  this.getCurrentDate()
            }
        },
        getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            }
            else {
                return num;
            } 
        },
        getCurrentDate(){
            const today= new Date()
            const d = this.getZero(today.getDate())
            const m = this.getZero(today.getMonth() + 1)
            const y = today.getFullYear()
            console.log('getCurrentDate',  d, m, `${d}.${m}.${y}`)
            return `${d}.${m}.${y}`
        },
        onClick(){
            const {value, category} = this
            this.data = {
                date: this.date || this.getCurrentDate(), 
                category,
                value
            }
            console.log('onClick', this.data)
            this.$emit('addNewPayment', this.data)
        },
        onSave() {
            console.log('onSave')
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    if (this.value > 0 && this.category != '')
                    {
                    
                        const items = [{value:this.value, category: this.category, date: this.date}]
                        console.log('onSave_', items, this.data)
                        resolve (items)
                    }
                }, 1000)
                
            })
            .then(res => this.$store.commit('addDataToPaymentList',res))
        }

    },
    mounted() {
       this.onSave()
    },
    watch: {
        $route(to, from) {
            //this.payFormVisible = true
            console.log('watch', to, from);
            this.value = this.setValue(),
            this.category = this.setCategory()

            this.onSave()
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
        margin-top: 20px;
    }
    .payment-form__input {
        margin-right: 10px;
        width: 150px;
    }
</style>