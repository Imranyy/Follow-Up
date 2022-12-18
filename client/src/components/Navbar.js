import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isUserUi,setIsUserUi]=useState();
    const [isAdminUi,setIsAdminUi]=useState();
    const loggedinLink=document.querySelectorAll('.logged-in');
    const loggedoutLink=document.querySelectorAll('.logged-out');
    //check ui
      const checkUi=async()=>{
        if(sessionStorage.getItem('adminToken')){
          try {
            const url='http://localhost:5000/api/admins/verify';
            const response=await fetch(url,{
              method:"GET",
              headers:{
              "authorization":`Bearer ${sessionStorage.getItem('adminToken')}`
              }
            })
            const parseRes=await response.json();
            parseRes===true?setIsAdminUi(true):setIsAdminUi(false)
          } catch (error) {
            toast.error(error.message)
          }
        } else{
            try {
                const url='http://localhost:5000/api/verify';
                const response=await fetch(url,{
                  method:"GET",
                  headers:{
                  "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                  }
                })
                const parseRes=await response.json();
                  parseRes===true?setIsUserUi(true):setIsUserUi(false)
              } catch (error) {
                toast.error(error.message)
              }
        }
      }
      useEffect(()=>{
        checkUi();
      },[])
      
     if(isUserUi===false){
      loggedinLink.forEach(item=>item.style.display='none')
      loggedoutLink.forEach(item=>item.style.display='block')
    }else if(isUserUi===true){
      loggedinLink.forEach(item=>item.style.display='block')
      loggedoutLink.forEach(item=>item.style.display='none')
    }
    console.log(isUserUi)
    //👌🎨📣🎧
    const showMenu=()=>{
        document.querySelector('.menu-list-bg').style.display='block';
    }
    const closeMenu=()=>{
        document.querySelector('.menu-list-bg').style.display='none';
    }
    const logOut=()=>{
        toast.success('You have signed out')
        localStorage.removeItem('username');
        localStorage.removeItem('pic');
        localStorage.removeItem('email');
        localStorage.removeItem('userID');
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('adminToken');
        closeMenu();
        setIsUserUi(false)
    }
    return (
        <>
            <nav className='nav-bar'>
                <div className='nav-bar'>
                    <div className='brand-name'><Link to='/home'>Voice Tweet🐌</Link></div>
                    <ul className='nav-item'>
                        <li className='logged-in' style={{display:'none'}}><Link to='/'>{localStorage.getItem('username')}</Link></li>
                        <li><Link className='logged-out' style={{display:'none'}} to='/'>Home</Link></li>
                        <li><Link to='/home'>Home</Link></li>
                        <li className='logged-out' style={{display:'none'}}><Link to='/login'>Sign In</Link></li>
                        <li className='logged-in' style={{display:'none'}}><button onClick={logOut} className='sign-out-btn'>Sign Out</button></li>
                        <li><button onClick={showMenu} className='menu-btn'>Menu</button></li>
                    </ul>
                
                </div>
            </nav>
            <div className='menu-list-bg' onClick={closeMenu}>
                <div className='menu-list'>
                    <button onClick={closeMenu}>Close</button>
                    <ul>
                        <li className='logged-in' style={{display:'none'}}><Link to='/' onClick={closeMenu}>{localStorage.getItem('username')}</Link></li>
                        <li><Link className='logged-out' style={{display:'none'}} to='/'>Home</Link></li>
                        <li><Link to='/home' onClick={closeMenu}>Home</Link></li>
                        <li className='logged-out' style={{display:'none'}}><Link to='/login' onClick={closeMenu}>Sign In</Link></li>
                        <li className='logged-in' style={{display:'none'}}><a href='#' onClick={logOut}>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;