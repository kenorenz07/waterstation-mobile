import { createStore } from "vuex";

import axios from '../axios'


const store = createStore({
    state: () => ({
        user: {},
        memories : [
            {
                id : 1,
                title : 'memory 1',
                description : 'memory description 1',
                image : 'https://previews.123rf.com/images/yupiramos/yupiramos1904/yupiramos190411282/123547884-creative-bulb-idea-with-puzzles-to-memory-vector-illustration.jpg'
            },
            {
                id : 2,
                title : 'memory 2',
                description : 'memory description 2',
                image : 'https://previews.123rf.com/images/yupiramos/yupiramos1904/yupiramos190411282/123547884-creative-bulb-idea-with-puzzles-to-memory-vector-illustration.jpg'
            },
            {
                id : 3,
                title : 'memory 3',
                description : 'memory description 3',
                image : 'https://previews.123rf.com/images/yupiramos/yupiramos1904/yupiramos190411282/123547884-creative-bulb-idea-with-puzzles-to-memory-vector-illustration.jpg'
            },
            {
                id : 4,
                title : 'memory 4',
                description : 'memory description 4',
                image : 'https://previews.123rf.com/images/yupiramos/yupiramos1904/yupiramos190411282/123547884-creative-bulb-idea-with-puzzles-to-memory-vector-illustration.jpg'
            },
        ]
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
        }
    },
    actions : {

        async updateUser({ commit }) {
          try {
            
            const response = await axios.get(localStorage.getItem("user_type") == "customer" ? 'user/v1/details' : 
            localStorage.getItem("user_type") == "delivery_man" ? 'delivery_man/v1/details' : 'admin/v1/details');
            localStorage.setItem("token", response.data.token);
            commit('SET_USER', response.data)
            return response.data
          } catch (error) {
            commit('SET_USER', null)
            localStorage.removeItem("token");
          }
        }
      
    },
    mutations : {
        SET_USER(state, user) {
            state.user = user
        },
        
    }
});

export default store;