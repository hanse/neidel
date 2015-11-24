import './Header.css';
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {

  static propTypes = {
    updateAuth: PropTypes.func.isRequired
  }

  handleSave() {
    const position = this.refs.position.value.trim();
    const token = this.refs.token.value.trim();
    this.props.updateAuth(position, token);
  }

  render() {
    return (
      <div className='Header'>
        <nav className='Navigation'>
          <ul>
            <li><IndexLink to='/' activeClassName='active'>New</IndexLink></li>
            <li><Link to='/popular' activeClassName='active'>Popular</Link></li>
            <li><Link to='/mine' activeClassName='active'>Mine</Link></li>
            <li><Link to='/discussed' activeClassName='active'>Discussed</Link></li>
            <li className='u-pad-left'><input type='text' ref='position' placeholder='Position lat/lng' defaultValue='63.43,10.41' /></li>
            <li><input ref='token' type='text' placeholder='Access Token' defaultValue='' /></li>
            <li><button className='Button' onClick={::this.handleSave}>Save</button></li>
          </ul>
        </nav>
      </div>
    );
  }
}
