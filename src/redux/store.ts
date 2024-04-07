import { combineReducers, createStore } from "redux"
import { toggleReducer } from "./reducer/toggleReducer"
import { listingReducer } from "./reducer/listingReducer"
import { actionReducer } from "./reducer/actionReducer"
import { filterReducer } from "./reducer/filterReducer"



const reducer = combineReducers({
    toggleReducer: toggleReducer,
    listingReducer:listingReducer,
    actionReducer:actionReducer,
    filterReducer:filterReducer
})

const store = createStore(reducer)
export default store