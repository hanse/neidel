import { Map } from 'immutable';
import createReducer from '../utils/createReducer';
import { Auth } from '../actions/types';

const initialState = Map({
  position: '63.43,10.41',
  token: null
});

export default createReducer(initialState, {
  [Auth.UPDATE]: (state, action) =>
    state.merge({ position: action.position, token: action.token })
});
