import React from 'react';
import { Link} from 'react-router-dom';

const Header = () => (
  <div className='navbar navbar-default'>
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to='/' className="navbar-brand">Shop App</Link>
      </div>
    </div>
  </div>
);

export default Header;