import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const POST_DOG = 'POST_DOG';
export const FILTER_CREATE = 'FILTER_CREATE';
export const FILTER_BY_TEMP = 'FILTER_BY_TEMP';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const CLEAR = 'CLEAR';

export function getDogs(){
    return async function(dispatch){
    var json = await axios.get(`/dogs`)
       return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }
    }

export function getDetail(id){
    return async function(dispatch){ 
            var json = await axios.get(`/dogs/${id}`);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
        
    }
}
export function getTemperaments(){
    return async function(dispatch){ 
        var json = await axios.get('/temperaments');
    return dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: json.data
    })
}}

export function postDog(payload){
    return async function(){ 
        var data = await axios.post('/dogs',payload);
    return data
}}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATE',
        payload
    }
}

export function dogsByName (name) {
    return async function(dispatch){try{
        var json = await axios.get('/dogs?name=' + name)
        return dispatch({
            type: 'GET_DOGS_BY_NAME',
            payload: json.data
        })
    }catch(error){
        console.log(error)
    }
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return {
        type:'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterByTemp(payload){
    return {
        type: 'FILTER_BY_TEMP',
        payload
    }
}
export function clear(payload){
    return{
        type:'CLEAR',
        payload
    }
}