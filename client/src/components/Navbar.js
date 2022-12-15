import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    //👌🎨📣🎧
    const showMenu=()=>{
        document.querySelector('.menu-list').style.display='block';
    }
    const closeMenu=()=>{
        document.querySelector('.menu-list').style.display='none';
    }
    return (
        <>
            <nav>
                <div className='nav-bar'>
                    <div className='brand-name'><Link to='/'>Podcast.🐌</Link></div>
                    <ul className='nav-item'>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/login'>Sign In</Link></li>
                        <li><Link to='/register'>Sign Up</Link></li>
                        <li><button onClick={showMenu} className='menu-btn'>Menu</button></li>
                    </ul>
                
                </div>
            </nav>
            <div className='menu-list'>
                <button onClick={closeMenu}>Close</button>
                <ul>
                    <li><Link to='/home' onClick={closeMenu}>Home</Link></li>
                    <li><Link to='/login' onClick={closeMenu}>Sign In</Link></li>
                    <li><Link to='/register' onClick={closeMenu}>Sign Up</Link></li>
                </ul>

            </div>
        </>
    );
}

export default Navbar;