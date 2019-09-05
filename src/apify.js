import axios from 'axios'
import qs from 'qs'

function createApiStore(path, initialModel){
    const mutations = makeApiMutations(initialModel)
    const actions = makeApiCalls(path)
    return {
        namespaced: true,
        state: {
            items: {},
            itemList: [],
            item: initialModel ? initialModel() : {},
            search: {}
        },
        mutations,
        getters: {
            item: (state) =>{
                return state.item
            },
            search: (state) =>{
                return state.search
            },
            items: (state) =>{
                return state.itemList.map((x)=>state.items[x])
            },
            getSearch: (state) => (field) => {
                return state.search[field]
            },
            getModel: (state) => (field) => {
              return state.item[field]
            }
        },
        actions
    }
}

function makeApiMutations(initialModel){
    return {
        newItem(state, item){
            state.item = item
            state.items = {...state.items, [item._id]: JSON.parse(JSON.stringify(item))}
            state.itemList = Object.keys(state.items)
        },
        newItems(state, items){
            state.items = items.reduce((obj, v)=>{
                obj[v._id] = v
                return obj
            },{})
            state.itemList = items.map(x => x._id)
        },
        updateItem(state, item){
            state.items = {...state.items, [item._id]: item}
            state.itemList = Object.keys(state.items)
        },
        updateModel(state, {name, value}){
            state.item = {...state.item, [name]: value}
        },
        updateSearch(state, {name, value}){
            state.search = {...state.search, [name]: value}
        },
        editItem(state, _id){
            state.item = {...state.items[_id]}
        },
        resetModel(state){
            if(initialModel){
                state.item = initialModel()
            }else{
                state.item = {}
            }
        },
        resetSearch(state){
            state.search = {}
        },
        reset(state){
            state.items = {}
            state.itemList = []
            state.item = {}
            state.search = {}
        }
    }
}

function makeApiCalls(path){
    return {
        async fetchOne({commit}, {_id, query}){
            try{
                const response = await axios.get(path + '/' + _id, {
                    //headers: { Authorization: "Bearer " + rootState.JWT },
                    params: query,
                    paramsSerializer: params => {
                        return qs.stringify(params, {arrayFormat: 'comma' })
                    }
                })
                commit('newItem', response.data)
            }catch(err){
                commit('toast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async fetch({commit}, query){
            try{
                const response = await axios.get(path, {
                    //headers: { Authorization: "Bearer " + rootState.JWT },
                    params: query,
                    paramsSerializer: params => {
                        return qs.stringify(params, {arrayFormat: 'comma' })
                    }
                })
                commit('newItems', response.data)
            }catch(err){
                commit('setToast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async post({commit}, body){
            delete body._id
            try{
                const response = await axios.post(path, body, {
                    //headers: {Authorization: "Bearer " + rootState.JWT}
                })
                body._id = response.data._id
                commit('newItem', body)
                commit('toast', {text: 'Datos guardados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                commit('toast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        },
        async patch({commit}, {_id, body}){
            try{
                await axios.patch(path + '/'  + _id, body, {
                    //headers: {Authorization: "Bearer " + rootState.JWT}
                })
                body._id = _id
                commit('updateItem', body)
                commit('toast', {text: 'Datos actualizados con éxito', variant: 'success'}, {root: true})
            }catch(err){
                console.log(err)
                commit('toast', {text: err.response.data.error, variant: 'error'}, {root: true})
            }
        }
    }
}

export default createApiStore