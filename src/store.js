import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import mapReducer from './pages/map/MapReducer';
import { loadState, saveState } from './SessionStorage';

const middleware = [thunk];
const enhancers = [];
const reducers = combineReducers({
  form: formReducer,
  locations: mapReducer
});

const initialState = loadState();

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), ...enhancers)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
