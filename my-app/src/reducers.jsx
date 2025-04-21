import { combineReducers } from "redux";
import roleReducer from "./pages/role/roleReducer";
import department from './Department/departmentReducer';

const rootReducer = combineReducers({
    role: roleReducer,
    department: department
});

export default rootReducer;
