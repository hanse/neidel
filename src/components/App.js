import './App.css';
import React, { PropTypes, Component } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      React.cloneElement(this.props.children, this.props)
    );
  }
}
