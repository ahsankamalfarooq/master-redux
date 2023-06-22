import { createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

const inc = 'increment'
const dec = 'decrement'
const incByAmt = 'incrementByAmount'

//store

const store = createStore(reducer, applyMiddleware(logger.default))
const history = []

//we can get error wrinting name of action so made it constant


// function reducer = ()

function reducer(state={amount :1 }, action) {
    // const amount = 1
    if(action.type === inc) {

        // immutability
        // state.amount = state.amount+1 
        //but above we change the previous state which is not suitable

        //////////////////////
        // so we did this to avoid immutability


        // return {amount : state.amount+1} here we create another obj of javascript whcih is not suitable
          // return state
    return {amount : state.amount+1}
    }


    if(action.type === dec) {
        return {amount : state.amount-1}
    }
    if(action.type === incByAmt) {
        return {amount : state.amount + action.payload}
    }
    return state
}

//how to get state from the store

// console.log(store.getState())


// we dont need to console the state state every time we change 
// the state instead we can use the store.subscribe method so when we will change the state
// it will print the latest state

//we can also push the updated state in history to see all
//prev and updated state


// store.subscribe(() => {
//     history.pushState(store.getState())
//     console.log(history)
// })
store.subscribe(() => {
    console.log(store.getState())
})

// {type : 'increment'}
//how to send action into store & in store in reducer

// store.dispatch({type:'increment'})

// we can also send the dispatch or action after every specific
// time using interval

//Action Creator
function increment() {
    return {type : inc}
}
function decrement() {
    return {type : dec}
}
function incrementByAmount(value) {
    return {type : incByAmt, payload : value}
}

setInterval(() => {
    // store.dispatch({type:'increment'})
    // store.dispatch({type:'decrement'})
    // store.dispatch({type:'incrementByAmount', payload : 4})
    store.dispatch(incrementByAmount(4))

}, 3000)

 






