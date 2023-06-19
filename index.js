import { createStore} from "redux";


//store

const store = createStore(reducer)

// function reducer = ()

function reducer(state={amount :1 }, action) {
    // const amount = 1
    if(action.type === 'increment') {

        // immutability
        state.amount = state.amount+1 
        //but above we change the previous state which is not suitable


        // return {amount : state.amount+1} here we create another obj of javascript whcih is not suitable
    }
    return state 
}

//how to get state from the store

// console.log(store.getState())



// console.log(store.getState())
// we dont need to console the state state every time we change 
// the state instead we can use the store.subscribe method so when we will change the state
// it will print the latest state

//we can also push the updated state in history to see all
//prev and updated state


store.subscribe(() => {
    history.pushState(store.getState())
    console.log(history)
})

// {type : 'increment'}
//how to send action into store & in store in reducer

// store.dispatch({type:'increment'})

// we can also send the dispatch or action after every specific
// time using interval

setInterval(() => {
    store.dispatch({type:'increment'})
}, 2000)








