<template>

    <!-- <div>
        <div class="payment-button">
            <button @click="payFormVisible=!payFormVisible"> Add Cost </button>
        </div>
        <template v-if="payFormVisible"> -->
            <div class="payment-form"> 
                <input class="payment-form__input"  placeholder="Date" type="text" v-model.trim="date" name="date"/>
                <!-- <input placeholder="Category" type="text" v-model.trim="category" /> -->
                <select class="payment-form__input"   v-model="category">
                    <option v-for="(item, idx) in categoryList" :value="item" :key="idx">
                        {{item}}
                    </option>
                </select>
                <input class="payment-form__input" placeholder="Amout" type="number" v-model.number="value" name="value"/>
                <button  @click="onClick"> Save </button>
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
        },
        id: {
            type: Number,
            default: 0,
        },
        mode: {
            type: String,
            default: '',
        },

    },
    data(){
        return {
            value: this.setValue(),
            category:  this.setCategory(),
            date: this.setDate(),
            data: {}
           
           
            //payFormVisible: true
        }
    },
    methods:{
        setValue() {
            if (this.mode == 'edit') {
                console.log('setValue_edit',this.data, this.$store.getters.getPaymentItem(this.id).value)
                return this.$store.getters.getPaymentItem(this.id).value
             }
            if (this.mode == 'add' && this.$route.name != null)
            {
                console.log('setValue_route',this.$route.query.value)
                return Number(this.$route.query.value)
            }
            else {
                console.log('setValue_btn',this.$route.query.value)
                return 0
            }
        },
        setCategory () {
           
            if (this.mode == 'edit') {
                 console.log('setCategory',  this.categoryList)
                //this.categoryList = [this.$store.getters.getPaymentItem(this.id).category];
                return  this.$store.getters.getPaymentItem(this.id).category
             }
             if (this.mode == 'add' && this.$route.name != null)
            {
                console.log('setCategory_route', this.$route.params.id)
                //this.categoryList = [this.$route.params.id]; 
                return this.$route.params.id
            }
            else {
                console.log('setCategory_btn')
                return ''
            }
        }, 
        setDate() {
            if (this.mode == 'edit') {
                
                return this.$store.getters.getPaymentItem(this.id).date
             }
            if (this.mode == 'add' && this.$route.name != null)
            {
                console.log('setDate_route', this.getCurrentDate());
                return  this.getCurrentDate()
            }
            else
            {
                console.log('setDate_btn', this.date);
                return this.date
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
            console.log('onClick', this.mode, this.$store.getters.getMaxID)
            if (this.mode == 'add') {
                const {value, category} = this
                this.data = {
                    date: this.date || this.getCurrentDate(), 
                    category,
                    value, 
                    id: this.maxID + 1
                }
                console.log('onClick', this.data)
                //const items = [{...{id:0,}, ...value}]
                this.$store.commit('addDataToPaymentList',[this.data])
                //return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
                
                // this.$emit('addNewPayment', this.data)
                    
             }
           
            if (this.mode == 'edit') {
                const {value, category, date, id} = this
                this.data = {
                    date, 
                    category,
                    value, 
                    id
                }
                console.log('onClick_edit', this.data)
                this.$store.commit('editDataToPaymentList',this.data)
                //return this.paymentsList.sort((a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY'))
             }

        },
        onSave() {
            console.log('onSave')
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    if (this.value > 0 && this.category != '')
                    {
                    
                        const items = [{value:this.value, category: this.category, date: this.date, id: (this.maxID + 1)}]
                        console.log('onSave_', items, this.data)
                        resolve (items)
                    }
                }, 3000)
                
            })
            .then(res => this.$store.commit('addDataToPaymentList',res))
        }

    },
    mounted() {
       if (this.mode == 'add' && this.$route.name != null) {this.onSave()}
      
    },
    computed:{
        maxID() {
            return this.$store.getters.getMaxID 
        }
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