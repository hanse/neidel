import './Header.css';
import React from 'react';
import { Link, IndexLink } from 'react-router';

const Navigation = () => (
  <nav className='Navigation'>
    <ul>
      <li><IndexLink to='/' activeClassName='active'>New</IndexLink></li>
      <li><Link to='/popular' activeClassName='active'>Popular</Link></li>
      <li><Link to='/mine' activeClassName='active'>Mine</Link></li>
      <li><Link to='/discussed' activeClassName='active'>Discussed</Link></li>
      <li className='u-pad-left'><input type='text' placeholder='Position lat/lng' value='63.43,10.41' /></li>
      <li><input type='text' placeholder='Access Token' value='' /></li>
    </ul>
  </nav>
);

export default () => (
  <div className='Header'>
    <Navigation />
  </div>
);
