import { Post } from './types';

const url = 'http://localhost:3000';

export function fetchPosts(path) {
  return (dispatch) => {
    dispatch({ type: Post.FETCH_BEGIN });
    return fetch(`${url}/posts${path}`::log())
      .then(res => res.json())
      .then(
        result => dispatch({ type: Post.FETCH_SUCCESS, posts: result.posts }),
        error => dispatch({ type: Post.FETCH_FAILURE, error })
      );
  };
}

export function upvote(postId) {
  return (dispatch) => {
    dispatch({ type: Post.UPVOTE_BEGIN, postId });
    return fetch(`${url}/posts/${postId}/upvote`, { method: 'post' })
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
      .then(res => res.json())
      .then(
        () => dispatch({ type: Post.DOWNVOTE_SUCCESS, postId }),
        error => dispatch({ type: Post.DOWNVOTE_FAILURE, error })
      );
  };
}

export function kill() {}
export function star() {}
