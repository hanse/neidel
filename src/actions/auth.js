import { Auth } from './types';

export function updateAuth(position, token) {
  return {
    type: Auth.UPDATE,
    position, token
  };
}
