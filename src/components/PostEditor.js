import './PostEditor.css';
import React, { PropTypes, Component } from 'react';

export default class PostEditor extends Component {
  static propTypes = {
    savePost: PropTypes.func.isRequired
  }

  state = {
    message: '',
    open: false
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.savePost(this.state.message);
    this.setState({ message: '', open: false });
  }

  render() {
    return (
      <div className='PostEditor'>
        {!this.state.open && <button
          className='Button'
          onClick={() => this.setState({ open: true })}
        >Write a Jodel</button>}

        {this.state.open && (
          <form onSubmit={::this.handleSubmit}>
            <textarea
              onChange={(e) => this.setState({ message: e.target.value })}
              placeholder='Write something funny'
              autoFocus
              value={this.state.message}
            />
            <button className='Button'>Post Jodel</button>
          </form>
        )}
      </div>
    );
  }
}
