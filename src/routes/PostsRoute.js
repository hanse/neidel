import { connect } from 'react-redux';
import Posts from '../components/Posts';
import { fetchPosts, upvote, downvote, kill, star, savePost } from '../actions/posts';
import { updateToken, updateLocation } from '../actions/auth';

export default connect((state) => ({
  posts: state.posts.get('posts').toJS(),
  loading: state.posts.get('loading'),
  locations: state.auth.get('locations').toJS(),
  currentLocation: state.auth.getIn(['locations', state.auth.get('currentLocation'), 'loc_coordinates']).toJS()
}), {
  fetchPosts,
  upvote,
  downvote,
  kill,
  star,
  updateToken,
  updateLocation,
  savePost
})(Posts);
