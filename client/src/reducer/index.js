import {GET_ALL_DOGS,GET_DETAIL,POST_DOG,GET_TEMPERAMENTS,FILTER_CREATE, GET_DOGS_BY_NAME,ORDER_BY_NAME,ORDER_BY_WEIGHT,FILTER_BY_TEMP,CLEAR} from '../actions/index'
const initialState = {
    dogs: [],
    detail: [],
    temperaments: [],
    allDogs: []
}

function rootReducer ( state= initialState, action){
switch(action.type){
            case GET_ALL_DOGS:
                return {
                    ...state,
                    dogs: action.payload,
                    allDogs: action.payload
                }
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }
            case POST_DOG:
                return{
                    ...state
                }
            case GET_TEMPERAMENTS:
                return{
                    ...state,
                    temperaments: action.payload
                }
            case GET_DOGS_BY_NAME:
                return{
                    ...state,
                    dogs: action.payload
                }
            case FILTER_CREATE:
                const filter = action.payload === 'created' ? state.allDogs.filter( c => c.createdInDb) : state.allDogs.filter(c => !c.createdInDb)
                    return{
                    ...state,
                    dogs: filter
                }
            case ORDER_BY_NAME:
            let arr = action.payload === 'asc' ? 
            state.dogs.sort(function (a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function (a,b){
                if (a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0
            })    
                return{
                    ...state,
                    dogs: arr
                }
            case ORDER_BY_WEIGHT:
            const dogi = state.dogs
            let arreglo = action.payload === 'peso' ?
                dogi.sort((a,b) => {
                const pesoA = Number(a.weight.split("-")[0])
                const pesoB = Number(b.weight.split("-")[0])
                if(pesoA < pesoB) return -1
                if(pesoA > pesoB) return 1
                return 0
            })
            : dogi.sort((a,b) => {
                const pesoA = a.weight.split("-")
                const pesoB = b.weight.split("-")
                if(pesoA.length < 2 && pesoB.length < 2){
                    if(Number(pesoB) < Number(pesoA)) return -1
                    if(Number(pesoB) > Number(pesoA)) return 1
                    return 0
                }
                if(pesoA.length < 2){
                    if(Number(pesoB[1]) < Number(pesoA)) return -1
                    if(Number(pesoB[1]) > Number(pesoA)) return 1
                    return 0
                }
                if(pesoB.length < 2){
                    if(Number(pesoB) < Number(pesoA[1])) return -1
                    if(Number(pesoB) > Number(pesoA[1])) return 1
                    return 0
                }
                    if(Number(pesoB[1]) < Number(pesoA[1])) return -1
                    if(Number(pesoB[1]) > Number(pesoA[1])) return 1
                    return 0
            })
            return{
                ...state,
                dogs: arreglo
            }
            case FILTER_BY_TEMP:
                const allDoggies = [...state.allDogs];
                const temperamentFiltered = action.payload === "Temperamentos"
                 ? allDoggies 
                 : allDoggies.filter(dog=> dog.temperament 
                ? dog.temperament.includes(action.payload) 
                : dog.temperamentos && (dog.temperamentos.map((t) => t.name.concat(" "))).join(", ").includes(action.payload))
            return {
                ...state,
                dogs: temperamentFiltered
            };
            case CLEAR:
            return{
                ...state,
                detail:[],
            }
            default: 
                    return state;
}
}
export default rootReducer;