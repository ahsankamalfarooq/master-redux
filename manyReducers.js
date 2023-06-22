import { createStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const init = 'account/init'
const inc = 'account/increment'
const dec = 'account/decrement'
const incByAmt = 'account/incrementByAmount'
const incBonus = 'bouns/increment'
const store = createStore(combineReducers({
    account : accountReducer,
    bonus : bonusReducer
})
    , applyMiddleware(logger.default, thunk.default))

//here the amt we want is from data wich is in db.json file ie server
function accountReducer(state={amount :1 }, action) {

    switch(action.type){
        case init: return {amount : action.payload +1}
        case dec: return {amount : action.payload -1}
        case incByAmt: return {amount :action.payload}
        default : return state
    }  }

    function bonusReducer(state={points :1 }, action) {
        switch(action.type){
            case incBonus: return {points : state.points +1}
            case incByAmt : 
//if ssome one deposit money more than 100 he will get a point
            if(action.payload >=100){
                return {points : state.points +1}
            }
            // case inc: return {points : state.points +1}
            // case dec: return {points : state.points -1}
            default : return state
        }
    }

store.subscribe(() => {
    console.log(store.getState())
})
    function getUser(id) {
        return async (dispatch, getState) =>{
            const {data} = await axios.get(`http://localhost:3000/account/${id}`)
            dispatch(initUser(data.amount))
        }  }
function initUser(value) {
    return {type : init, payload: value} }
function increment() {
    return {type : inc} }
function decrement() {
    return {type : dec}}
function incrementByAmount(value) {
    return {type : incByAmt, payload : value}}
function incrementBouns(value) {
    return {type : incBonus, payload : value}}

    // store.dispatch(getUser(2))
    store.dispatch(incrementBouns())





