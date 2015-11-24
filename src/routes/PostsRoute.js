import { connect } from 'react-redux';
import Posts from '../components/Posts';
import { fetchPosts, upvote, downvote, kill, star, savePost } from '../actions/posts';
import { updateAuth } from '../actions/auth';

export default connect((state) => ({
  posts: state.posts.get('posts').toJS(),
  loading: state.posts.get('loading')
}), {
  fetchPosts,
  upvote,
  downvote,
  kill,
  star,
  updateAuth,
  savePost
})(Posts);
