import './App.css';
import React, { PropTypes, Component } from 'react';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    hasToken: PropTypes.bool
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
