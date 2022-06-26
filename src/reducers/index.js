import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import sentReducer from "./sentReducer";
import fileReducer from "./fileReducer";


const rootReducer = combineReducers({
    user: userReducer,
    sentState: sentReducer,
    files: fileReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))