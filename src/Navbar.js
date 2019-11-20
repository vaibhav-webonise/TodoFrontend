import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>log In</Link></li>
        <li> <Link to='/signup'>Sign Up</Link></li>
        <li> <Link to='/todos'>My Todos</Link></li>
      </ul>
    </nav>
  )
}
