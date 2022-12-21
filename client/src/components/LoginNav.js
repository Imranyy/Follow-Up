import React from 'react';
import { Link } from 'react-router-dom';

function LoginNav({userUI, adminUI}) {
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
    const showUsers=()=>{
        // document.querySelector('.bg').style.transition='ease-in-out 500ms';
        document.querySelector('.bg').classList.add('show');
    }
    const closeUsers=()=>{
        document.querySelector('.bg').classList.remove('show')
    }
    return (
        <>
            <nav className='nav-bar logged-in' style={{display:'none'}}>
                <div className='side-bar'>
                    <ul>
                        <li onClick={closeUsers}><Link to='/topics'>Topic</Link></li>
                        <li><a href='#' onDoubleClick={closeUsers} onClick={showUsers}>Users</a></li>
                        <li onClick={closeUsers}><Link to='/chats'>chats</Link></li>
                    </ul>
                </div>
                <div className='nav-bar' onClick={closeUsers}>
                    <div className='brand-name'><Link to='/home'>Follow up🐌</Link></div>
                    <ul className='nav-item'>
                        <li className='logged-in' style={{display:'none'}}><Link to='/topics'>Home</Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('username')}`}>{localStorage.getItem('username')}</Link></li>
                        <li><button onClick={showMenu} className='menu-btn'>Menu</button></li>
                    </ul>
                
                </div>
            </nav>
            <div className='menu-list-bg' onClick={closeMenu}>
                <div className='menu-list'>
                    <button onClick={closeMenu}>Close</button>
                    <ul>
                        <li><Link to='/topics' onClick={closeMenu}>Topics</Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('username')}`} onClick={closeMenu}>{localStorage.getItem('username')}</Link></li>
                    </ul>
                </div>
            </div>   
        </>
    );
}

export default LoginNav;