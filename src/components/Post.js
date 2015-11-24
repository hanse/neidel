import React, { PropTypes, Component } from 'react';
import nl2br from '../utils/nl2br';

export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    upvote: PropTypes.func,
    downvote: PropTypes.func,
    star: PropTypes.func,
    kill: PropTypes.func
  }

  state = {
    expanded: false
  }

  render() {
    const { post, upvote, downvote, star, kill } = this.props;
    return (
      <div className='Post' style={{ backgroundColor: `#${post.color}` }}>
        {post.thumbnail_url ? <img src={post.thumbnail_url} /> : nl2br(post.message)}
        <div className='Post__votes'>
          <span className='Post__votes__count'>{post.vote_count}</span>
          <button onClick={() => upvote(post.post_id)}>Up</button>
          <button onClick={() => downvote(post.post_id)}>Down</button>
          <button onClick={() => star(post.post_id)}>Star</button>
          <button onClick={() => kill(post.post_id)}>Kill</button>
          {post.child_count && <button
            onClick={() => this.setState({ expanded: !this.state.expanded })}
            >Replies ({post.child_count})
          </button>}
        </div>

        {post.child_count && this.state.expanded && (
          <div className='Post__replies'>
            {post.children.map((child, i) => <Post
              key={i}
              post={child}
              upvote={() => upvote(child.post_id)}
            />)}
          </div>
        )}
      </div>
    );
  }
}
