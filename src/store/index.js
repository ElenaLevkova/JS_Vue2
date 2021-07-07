import { reject } from 'q'
import Vue from 'vue'
import Vuex from 'vuex'
import {countPages, paymentData} from '../data.js'
console.log (paymentData, countPages)
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
            console.log('state.paymentsList', state.paymentsList)
        },
        setDisplayListData(state, payload) {
            state.displayList = payload
           
        },
        addLoadedPage(state, payload) {
            
            state.loadedPages.push(payload)
            console.log('state.loadedPages', state.loadedPages)
        },
        setCountPages(state, payload) {
            state.countPages = payload
            console.log('state.countPages', state.countPages)
        },
        addCategory(state, paylod) {
            state.category = [...state.category, ...paylod]
        }
    },
    getters:{
        getPaymentList: state => state.paymentsList,
        getCountPages: state => state.countPages,
        getCategoryFull: state => {
            return state.paymentsList.map(i=> i.category)
        },
        getCategoryList: state => {
            return state.category
        }
    },
    actions:{
        // someAction({commit}, res){
        // commit('setPaymentsListData', res)
        // },
        
        fetchData(context, page=1){
          if (context.state.loadedPages.includes(page)) {
              return 0
          }
          else {
                 return new Promise((resolve)=> { 
                    setTimeout(()=>{
                        if (page === 1)  context.commit('setCountPages', countPages);
                        if (Object.keys(paymentData).includes('page' + page)) {
                            const p = {page}
                            const items = paymentData['page' + page].map(el => {return {...p, ...el}})
                            resolve({items, page})
                        }
                        else
                        {
                            console.log('Запрашиваемой страницы не существует', page)
                            reject()
                        }
                    
                    }, 2000)
                })
                .then (res => {
                    context.commit('addDataToPaymentList', res.items);
                    context.commit('addLoadedPage', res.page);
                })
            }   
        },
        fetchCategoryList({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve (['Food','Transport', 'Education', 'Internet', 'GB', 'Life', 'Sport'])
                }, 1000)
            })
            .then(res => commit('addCategory', res))
        },
    }
    
})