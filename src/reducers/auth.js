import { Map } from 'immutable';
import createReducer from '../utils/createReducer';
// import { Auth } from '../actions/types';

const initialState = Map({
  deviceUID: null,
  token: null
});

export default createReducer(initialState, {
});
