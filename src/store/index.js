
//import { max } from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'
// import {countPages, paymentData} from '../data.js'
// console.log (paymentData, countPages)
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        displayList:[],
        loadedPages: [],
        countPages: 0,
        category: []
    },
    mutations:{
        setPaymentsListData(state, payload) {
            state.paymentsList = payload
           
        },
        addDataToPaymentList(state, payload) {
            console.log('addDataToPaymentList', payload, state.paymentsList)
            state.paymentsList = [...payload, ...state.paymentsList]
            //state.paymentsList.push(payload)
            console.log('state.paymentsList', state.paymentsList)
        },
        delDataToPaymentList(state, payload) {
            console.log('delDataToPaymentList', payload, state.paymentsList)
            const idx = state.paymentsList.findIndex(item => item.id == payload)
           // console.log('delDataToPaymentList0',  idx)
            state.paymentsList.splice(idx, 1)
            console.log('delDataToPaymentList1',  state.paymentsList)
        },
        editDataToPaymentList(state, payload) {
            console.log('editDataToPaymentList', payload, state.paymentsList)
            const idx = state.paymentsList.findIndex(item => item.id == payload.id)
            //state.paymentsList[idx] = payload
            Vue.set(state.paymentsList, idx, payload)
            console.log('editDataToPaymentList', idx, state.paymentsList[idx])
        },
        // setDisplayListData(state, payload) {
        //     state.displayList = payload
           
        // },
        // addLoadedPage(state, payload) {
            
        //     state.loadedPages.push(payload)
        //     console.log('state.loadedPages', state.loadedPages)
        // },
        // setCountPages(state, payload) {
        //     state.countPages = payload
        //     console.log('state.countPages', state.countPages)
        // },
        addCategory(state, paylod) {
            state.category = [...state.category, ...paylod]
        }
    },
    getters:{
        getPaymentList: state => state.paymentsList,
        // getCountPages: state => state.countPages,
        getCategoryFull: state => {
            return state.paymentsList.map(i=> i.category)
        },
        getCategoryList: state => {
            return state.category
        },
        getPaymentItem: state => id => {
            return state.paymentsList.find(item => item.id == id)
        },
        getMaxID: state => {
            let max = Math.max(...state.paymentsList.map(el => el.id))
            return max
        },
        getSumValueByCategory: state => category => {
            //console.log('getSumValueByCategory0', category, state.paymentsList)
            const categArr = state.paymentsList.filter(item => item.category == category)
           // console.log('getSumValueByCategory', categArr, categArr.reduce((acc, item) => acc + item.value, 0 ))
            return categArr.reduce((acc, item) => acc + item.value, 0 )
        }
        
    },
    actions:{
        // someAction({commit}, res){
        // commit('setPaymentsListData', res)
        // },
        
        // fetchData(context, page=1){
        //   if (context.state.loadedPages.includes(page)) {
        //       return 0
        //   }
        //   else {
        //          return new Promise((resolve)=> { 
        //             setTimeout(()=>{
        //                 if (page === 1)  context.commit('setCountPages', countPages);
        //                 if (Object.keys(paymentData).includes('page' + page)) {
        //                     const p = {page}
        //                     const items = paymentData['page' + page].map(el => {return {...p, ...el}})
        //                     resolve({items, page})
        //                 }
        //                 else
        //                 {
        //                     console.log('Запрашиваемой страницы не существует', page)
        //                     //reject()
        //                 }
                    
        //             }, 2000)
        //         })
        //         .then (res => {
        //             context.commit('addDataToPaymentList', res.items);
        //             context.commit('addLoadedPage', res.page);
        //         })
        //     }   
        // },
        fetchData(context){
            return new Promise((resolve)=> { 
                setTimeout(()=>{
                    const items = []
                    for (let i = 1; i< 50; i++) {
                        items.push({
                            date: '01.07.2021',
                            category: i % 4 ? "Food" : i % 3 ? "Education" : i % 2 ? 'GB' : 'Transport',
                            value: i,
                            id: i
                        });
                    }
                    console.log('fetchData', items);
                  resolve(items);
                }, 2000)
            })
            .then (res => { console.log('fetchData_', res);
                context.commit('addDataToPaymentList', res)});
        },
        fetchCategoryList({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve (['Food','Transport', 'Education', 'Internet', 'GB', 'Life', 'Sport'])
                }, 3000)
            })
            .then(res => commit('addCategory', res))
        },
    }
    
})