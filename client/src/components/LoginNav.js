import React from 'react';
import { Link } from 'react-router-dom';
import {  FaHome,FaUser, FaUserCircle, FaUserFriends} from 'react-icons/fa';
import {BsFillChatDotsFill} from 'react-icons/bs';
import { AiOutlineCloseSquare, AiOutlineMenu } from 'react-icons/ai';

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
            <nav className='nav-bar logged-in' >
                <div className='side-bar'>
                    <ul>
                        <li onClick={closeUsers}><Link to='/topics' title='Topics'><FaHome/></Link></li>
                        <li><a href='#' onDoubleClick={closeUsers} onClick={showUsers} title='Toggle Users modal'><FaUserFriends/></a></li>
                        <li onClick={closeUsers}><Link to='/chats' title='chats'><BsFillChatDotsFill/></Link></li>
                    </ul>
                </div>
                <div className='nav-bar' onClick={closeUsers}>
                    <div className='brand-name'><Link to='/home'>Follow up🐌</Link></div>
                    <ul className='nav-item'>
                        <li className='logged-in' style={{display:'none'}}><Link to='/topics' title='Topics'><FaHome/></Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('username')}`} title='Profile'><FaUserCircle/></Link></li>
                        <li><button onClick={showMenu} className='menu-btn'><AiOutlineMenu/></button></li>
                    </ul>
                
                </div>
            </nav>
            <div className='menu-list-bg' onClick={closeMenu}>
                <div className='menu-list'>
                    <button onClick={closeMenu}><AiOutlineCloseSquare/></button>
                    <ul>
                        <li><Link to='/topics' onClick={closeMenu}><FaHome/></Link></li>
                        <li className='logged-in' style={{display:'none'}}><Link to={`/user/${localStorage.getItem('username')}`} onClick={closeMenu}><FaUser/></Link></li>
                    </ul>
                </div>
            </div>   
        </>
    );
}

export default LoginNav;