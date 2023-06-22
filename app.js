import { createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const init = 'init'
const inc = 'increment'
const dec = 'decrement'
const incByAmt = 'incrementByAmount'

const store = createStore(reducer, applyMiddleware(logger.default, thunk.default))

//here the amt we want is from data wich is in db.json file ie server
function reducer(state={amount :1 }, action) {
    // const amount = 1

    switch(action.type){
        case init: return {amount : action.payload +1}
        case dec: return {amount : action.payload -1}
        case incByAmt: return {amount :action.payload}
        default : return state
    }
}

store.subscribe(() => {
    console.log(store.getState())
})

// //Async APi Call
// async function getUser(){
//    const {data} = await axios.get('hhtp://localhost:3000/accounts/1')
//    console.log(data)
// }
// getUser()


//Action Creaor for apis
// async function getUser(dispatch, getState) {
//     const {data} = await axios.get('http://localhost:3000/account/1')
//     // dispatch ({type : init, payload: data.amount})
//     dispatch(initUser(data.amount))
// }

// if we want to select to get the amount of user 1 or 2 we will do

    function getUser(id) {
        return async (dispatch, getState) =>{
            const {data} = await axios.get(`http://localhost:3000/account/${id}`)
            // dispatch ({type : init, payload: data.amount})
            dispatch(initUser(data.amount))
        }
    }

function initUser(value) {
    return {type : init, payload: value}
}

function increment() {
    return {type : inc}
}

function decrement() {
    return {type : dec}
}
function incrementByAmount(value) {
    return {type : incByAmt, payload : value}
}

setTimeout(() => {
    store.dispatch(getUser(2))
}, 3000)

 
//Now from onwards we are making multiple reducers so doing
//it it in new file




