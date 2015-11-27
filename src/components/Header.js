import './Header.css';
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {

  static propTypes = {
    updateToken: PropTypes.func.isRequired,
    updateLocation: PropTypes.func.isRequired,
    locations: PropTypes.array
  }

  handleSave() {
    const token = this.refs.token.value.trim();
    this.props.updateToken(token);
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
            <li className='u-pad-left'>
              <select ref='position' defaultValue={0} onChange={(e) => this.props.updateLocation(e.target.selectedIndex)}>
                {this.props.locations.map((location, i) => <option value={i}>{location.city}</option>)}
              </select>
            </li>
            <li><input ref='token' type='text' placeholder='Access Token' defaultValue='' /></li>
            <li><button className='Button' onClick={::this.handleSave}>Save</button></li>
          </ul>
        </nav>
      </div>
    );
  }
}
