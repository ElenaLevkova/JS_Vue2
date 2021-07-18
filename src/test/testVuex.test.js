import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import App from '../App'
import { mount } from '@vue/test-utils'
import AddCategoryForm from '../components/AddCategoryForm'
import ContextMenu from '../components/ContextMenu'
import indexStore from '../store/index'
import PaymentsDisplay from '../components/PaymentsDisplay'
const localVue = createLocalVue()
localVue.use(Vuex)



describe('AddCategoryForm ', ()=>{
    it('Test  input category', async ()=> {
        const wrapper = mount(AddCategoryForm, {
            propsData: {
                categoryFormVisible: true }})
        const inputcategory = wrapper.find('input[name=category]')
        inputcategory.setValue('1')

        expect(wrapper.vm.category).toBe('1')
    })

    it('Test click', async () => {
        //const onClick = jest.fn()
        const wrapper = mount(AddCategoryForm, {
        propsData: {
            categoryFormVisible: true }
        })
        spyOn(wrapper.vm, 'onClick')
        const btn = wrapper.find('button')

        btn.trigger('click')
        expect(wrapper.vm.onClick).toBeCalled()
    }
    )
})


describe('ContextMenu', () => {
    it('run mutations delDataToPaymentList', async () => {
        const mutations = {
          delDataToPaymentList: jest.fn()
        }

        const store = new Vuex.Store({ mutations })
        const wrapper = mount(ContextMenu, {
            store, localVue,
            propsData: {id: 10}
        })
      
        wrapper.vm.$modal = {hide: function () {}}
        await wrapper.find(".menu_delete").trigger("click")
        expect(mutations.delDataToPaymentList).toHaveBeenCalledWith({}, 10)
    })
}
)

describe('Mutations', () => {

  it('run mutation delDataToPaymentList',  () => {
      const payload = 1
      const state = {
          paymentsList: [{id:1},{id:2}]
      }

      indexStore.replaceState(state)
      indexStore.commit('delDataToPaymentList', payload)
      expect(state).toEqual({"paymentsList": [{"id": 2}]})
      
  })
}
)

describe('PaymentsDisplay', () => {
  it('output list PaymentsDisplay', async () => {

      const wrapper = mount(PaymentsDisplay, {
          localVue,
          propsData: {getPaymentList: [{id: 1, date: '01.01.2021', category: 'Food', value: 100}]}
      })
      const row = wrapper.find('.table-items')

      expect(row.text()).toContain('1 01.01.2021 Food 100 X')
  })
}

)