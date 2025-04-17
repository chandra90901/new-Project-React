import { combineReducers } from "redux";
import roleReducer from "./pages/role/roleReducer";

const rootReducer = combineReducers({
    role: roleReducer
});

export default rootReducer;
