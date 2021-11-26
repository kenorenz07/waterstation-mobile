import { createStore } from "vuex";

import axios from '../axios'


const store = createStore({
    state: () => ({
        user: {},
        cart_number : 0
    }),
    getters : {
        memories(state) {
            return state.memories
        },
        memory(state){
            return (id) => {
                return state.memories.find((memory) => memory.id == id)
            };
        },
        user(state) {
            return state.user;
        },
        cart_number(state) {
            return state.cart_number
        }
    },
    actions : {
        async updateCartNumber({ commit }) {
            const resp = await axios.get('user/v1/cart/all')
            commit('SET_CART_NUMBER', resp.data.length)
        },
        async updateUser({ commit }) {

          try {
            if(localStorage.getItem("token")){
                const response = await axios.get(localStorage.getItem("user_type") == "customer" ? 'user/v1/details' : 
                localStorage.getItem("user_type") == "delivery" ? 'delivery_man/v1/details' : 'admin/v1/details');
                commit('SET_USER', response.data)
                console.log(response.data,'user')
                return response.data
            }
          } catch (error) {
            commit('SET_USER', null)
            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
          }
        }
      
    },
    mutations : {
        SET_USER(state, user) {
            state.user = user
        },
        SET_CART_NUMBER(state,cart_number){
            state.cart_number = cart_number
        }
        
    }
});

export default store;