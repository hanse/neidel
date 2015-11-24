import { Map, List, fromJS } from 'immutable';
import createReducer from '../utils/createReducer';
import { Post } from '../actions/types';

const initialState = Map({
  posts: List(),
  loading: false
});

export default createReducer(initialState, {
  [Post.FETCH_SUCCESS]: (state, action) =>
    state.merge({ posts: fromJS(action.posts), loading: false }),

  [Post.FETCH_FAILURE]: (state) =>
    state.merge({ loading: false }),

  [Post.FETCH_BEGIN]: (state) =>
    state.merge({ loading: true }),

  [Post.UPVOTE_BEGIN]: (state, action) =>
    state.updateIn(
      ['posts', state.get('posts').findIndex(p => p.get('post_id') === action.postId), 'vote_count'],
      count => count + 1
    ),

  [Post.DOWNVOTE_BEGIN]: (state, action) =>
    state.updateIn(
      ['posts', state.get('posts').findIndex(p => p.get('post_id') === action.postId), 'vote_count'],
      count => count - 1
    )
});
