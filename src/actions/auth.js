import { Auth } from './types';
import fetchJSON from '../utils/fetchJSON';

const url = 'http://localhost:3000/api';

export function updateToken(token) {
  return {
    type: Auth.UPDATE_TOKEN,
    token
  };
}

export function updateLocation(location) {
  return (dispatch, getState) => {
    dispatch({ type: Auth.UPDATE_LOCATION_BEGIN, location });
    fetchJSON(`${url}/location`, {
      method: 'put',
      headers: {
        plebtoken: getState().auth.get('token') || '',
      },
      body: JSON.stringify({
        location: getState().auth.getIn(['locations', location]).toJS()
      })::log()
    }).then(
      result => dispatch({ type: Auth.UPDATE_LOCATION_SUCCESS, result }),
      error => dispatch({ type: Auth.UPDATE_LOCATION_FAILURE, error })
    );
  };
}
