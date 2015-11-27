import { Map, fromJS } from 'immutable';
import createReducer from '../utils/createReducer';
import { Auth } from '../actions/types';

const initialState = Map({
  token: null,
  locations: fromJS([{
    loc_accuracy: 19.0,
    city: 'Trondheim',
    loc_coordinates: {
      lat: 63.4299,
      lng: 10.3932
    },
    country: 'NO',
    name: 'mickjagger'
  }, {
    loc_accuracy: 19.0,
    city: 'Oslo',
    loc_coordinates: {
      lat: 59.9130,
      lng: 10.7502
    },
    country: 'NO',
    name: 'mickjagger'
  }]),
  currentLocation: 0
});

export default createReducer(initialState, {
  [Auth.UPDATE_TOKEN]: (state, action) =>
    state.merge({ token: action.token }),

  [Auth.UPDATE_LOCATION_BEGIN]: (state, action) =>
    state.merge({ currentLocation: action.location })
});
