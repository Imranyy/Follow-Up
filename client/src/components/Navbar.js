import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className='nav-bar1'>
                <div className='brand-name'><Link to='/home'>Follow Up🐌</Link></div>
            </nav>
        </>
    );
}

export default Navbar;