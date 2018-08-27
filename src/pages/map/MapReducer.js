import { createAction, createReducer } from 'redux-act';
import locationService from '../../services/LocationService';

export const requestStart = createAction('LOCATIONS_REQUEST_START');
export const requestFail = createAction('LOCATIONS_REQUEST_FAIL');
export const requestSuccess = createAction('LOCATIONS_REQUEST_SUCCESS');

export const load = () => dispatch => {
  dispatch(requestStart());
  const getUrl = 'locations';
  return locationService
    .get(getUrl)
    .then(data => {
      console.log(`${getUrl} retrieved successfully`, data);
      dispatch(requestSuccess(data));
      return Promise.resolve(data);
    })
    .catch(err => {
      console.error(`Error retrieving ${getUrl}`, err);
      dispatch(requestFail(err));
      return Promise.reject(err);
    });
};

const initialState = {
  error: null,
  loading: false,
  list: []
};

export default createReducer(
  {
    [requestFail]: (state, payload) => ({
      ...initialState,
      error: payload
    }),
    [requestStart]: () => ({
      ...initialState,
      loading: true
    }),
    [requestSuccess]: (state, payload) => ({
      ...initialState,
      list: payload
    })
  },
  initialState
);
