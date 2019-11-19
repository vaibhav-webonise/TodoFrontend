import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/login'>log In</a></li>
        <li> <a href='/todos'>My Todos</a></li>
      </ul>
    </nav>
  )
}
