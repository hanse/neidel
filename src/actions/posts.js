import { Post } from './types';

const url = 'http://localhost:3000/api';

function checkStatus(response) {
  if (response.status === 200) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetchPosts(path) {
  return (dispatch, getState) => {
    dispatch({ type: Post.FETCH_BEGIN });
    return fetch(`${url}/posts${path}`, {
      headers: {
        plebtoken: getState().auth.get('token') || ''
      }
    }).then(checkStatus)
      .then(res => res.json())
      .then(
        result => dispatch({ type: Post.FETCH_SUCCESS, posts: result.posts }),
        error => dispatch({ type: Post.FETCH_FAILURE, error })
      );
  };
}


export function savePost(message) {
  return (dispatch, getState) => {
    if (!message) return;
    dispatch({ type: Post.SAVE_BEGIN, message });

    fetch(`${url}/posts`, {
      method: 'post',
      headers: {
        plebtoken: getState().auth.get('token') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
      .then(checkStatus)
      .then(res => res.json())
      .then(
        result => (
          dispatch(fetchPosts(getState().router.location.pathname)),
          dispatch({ type: Post.SAVE_SUCCESS, result })
        ),
        error => dispatch({ type: Post.SAVE_FAILURE, error })
      );
  };
}

export function upvote(postId) {
  return (dispatch) => {
    dispatch({ type: Post.UPVOTE_BEGIN, postId });
    return fetch(`${url}/posts/${postId}/upvote`, { method: 'post' })
      .then(checkStatus)
      .then(res => res.json())
      .then(
        () => dispatch({ type: Post.UPVOTE_SUCCESS, postId }),
        error => dispatch({ type: Post.UPVOTE_FAILURE, error })
      );
  };
}

export function downvote(postId) {
  return (dispatch) => {
    dispatch({ type: Post.DOWNVOTE_BEGIN, postId });
    return fetch(`${url}/posts/${postId}/downvote`, { method: 'post' })
      .then(checkStatus)
      .then(res => res.json())
      .then(
        () => dispatch({ type: Post.DOWNVOTE_SUCCESS, postId }),
        error => dispatch({ type: Post.DOWNVOTE_FAILURE, error })
      );
  };
}

export function kill() {}
export function star() {}
