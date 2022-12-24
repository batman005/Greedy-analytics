import { combineReducers } from "redux";
import reportReducer from './reportReducer';


export default combineReducers({
    reportList: reportReducer,
})