import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer
});
export default rootReducer;
