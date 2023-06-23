import { createStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

// const init = 'account/init'
const inc = 'account/increment'
const dec = 'account/decrement'
const incByAmt = 'account/incrementByAmount'
const getAccUserPending = 'account/getUser/pending'
const getAccUserFulfilled = 'account/getUser/fulfilled'
const getAccUserRejected = 'account/getUser/rejected'
const incBonus = 'bouns/increment'
const store = createStore(combineReducers({
    account : accountReducer,
    bonus : bonusReducer
})
    , applyMiddleware(logger.default, thunk.default))

//here the amt we want is from data wich is in db.json file ie server
function accountReducer(state={amount :1 }, action) {

    switch(action.type){
        case getAccUserFulfilled: return {amount : action.payload +1, pending: false}
        case getAccUserRejected: return {...state, error: action.error, pending: false}
        case getAccUserPending: return {...state, pending: true}
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
    function getUserAccount(id) {
        return async (dispatch, getState) =>{
            try{
                dispatch(getAccountUserPending())
                const {data} = await axios.get(`http://localhost:3000/account/${id}`)
                dispatch(getAccountUserFulfilled(data.amount))
            } catch(error){
                dispatch(getAccountUserRejected(error.message))
            } 
            
        }  }
function getAccountUserFulfilled(value) {
    return {type : getAccUserFulfilled, payload: value} }
function getAccountUserPending() {
    return {type : getAccUserPending} }
function getAccountUserRejected(error) {
    return {type : getAccUserRejected, error: error} }
function increment() {
    return {type : inc} }
function decrement() {
    return {type : dec}}
function incrementByAmount(value) {
    return {type : incByAmt, payload : value}}
function incrementBouns(value) {
    return {type : incBonus, payload : value}}

    store.dispatch(getUserAccount(2))
    // store.dispatch(get())





