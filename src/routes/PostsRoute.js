import { connect } from 'react-redux';
import Posts from '../components/Posts';
import { fetchPosts, upvote, downvote, kill, star } from '../actions/posts';

export default connect((state) => ({
  posts: state.posts.get('posts').toJS(),
  loading: state.posts.get('loading')
}), {
  fetchPosts,
  upvote,
  downvote,
  kill,
  star
})(Posts);
