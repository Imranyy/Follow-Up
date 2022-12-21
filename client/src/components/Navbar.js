import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Navbar({userUI,adminUI}) {
    const loggedinLink=document.querySelectorAll('.logged-in');
    const loggedoutLink=document.querySelectorAll('.logged-out');
      
     if(userUI===false){
      loggedinLink.forEach(item=>item.style.display='none')
      loggedoutLink.forEach(item=>item.style.display='block')
    }else if(userUI===true){
      loggedinLink.forEach(item=>item.style.display='block')
      loggedoutLink.forEach(item=>item.style.display='none')
    }
    //👌🎨📣🎧
    const showMenu=()=>{
        document.querySelector('.menu-list-bg').style.display='block';
    }
    const closeMenu=()=>{
        document.querySelector('.menu-list-bg').style.display='none';
    }
   
    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-bar'>
                    <div className='brand-name'><Link to='/home'>Voice Tweet🐌</Link></div>
                    <ul className='nav-item'>
                        <li><Link to='/home'>Home</Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('userID')}`}>{localStorage.getItem('username')}</Link></li>
                        <li className='logged-out' style={{display:'none'}}><Link to='/login'>Sign In</Link></li>
                        <li><button onClick={showMenu} className='menu-btn'>Menu</button></li>
                    </ul>
                
                </div>
            </nav>
            <div className='menu-list-bg' onClick={closeMenu}>
                <div className='menu-list'>
                    <button onClick={closeMenu}>Close</button>
                    <ul>
                        <li><Link to='/home' onClick={closeMenu}>Home</Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('userID')}`} onClick={closeMenu}>{localStorage.getItem('username')}</Link></li>
                        <li className='logged-out' style={{display:'none'}}><Link to='/login' onClick={closeMenu}>Sign In</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;