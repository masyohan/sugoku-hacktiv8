import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import boardReducer from './reducers/boardReducer';
import gameReducer from './reducers/gameReducer';

const reducers = combineReducers({
    gameReducer,
    boardReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;