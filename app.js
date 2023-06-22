import { createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import axios from "axios";

const init = 'init'
const inc = 'increment'
const dec = 'decrement'
const incByAmt = 'incrementByAmount'

const store = createStore(reducer, applyMiddleware(logger.default))

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

//Async APi Call
async function getUser(){
   const {data} = await axios.get('hhtp://localhost:3000/accounts/1')
   console.log(data)
}


//Action Creaor for apis
function initUser() {
    return {type : inti}
}
function decrement() {
    return {type : dec}
}
function incrementByAmount(value) {
    return {type : incByAmt, payload : value}
}

setInterval(() => {
    store.dispatch(incrementByAmount(4))
}, 3000)

 






