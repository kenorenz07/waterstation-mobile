import { createStore } from "vuex";

const store = createStore({
    state: () => ({
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
        }
    }
});

export default store;