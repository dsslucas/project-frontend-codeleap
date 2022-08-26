import {publishReducer} from "./reducers/publishReducer";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
    publish: publishReducer
});