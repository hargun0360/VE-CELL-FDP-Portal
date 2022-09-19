import { combineReducers } from "redux";
import { toggleReducer} from './reducer';

const rootReducer = combineReducers({
  toggle: toggleReducer,
});

export default rootReducer;