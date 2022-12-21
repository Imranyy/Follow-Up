import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Guide(props) {
    const navigate=useNavigate();
    const showMenu=()=>{
        document.querySelector('.menu-bg').style.display='block';
    }
    const closeMenu=()=>{
        document.querySelector('.menu-bg').style.display='none';
    }
    const signUp=()=>{
        navigate('/register')
    }
    const emailUs=()=>{
        window.location.href=`mailto:imranmat254@gmail.com?subject=Message from a User in Voice Tweet🐌 concerning platform guides`
    }
    const back=()=>{
        navigate('/')
    }
    return (
        <>
         <div className='guide-page'>
            <div className='hero-image'>
                <nav className='nav'>
                    <div className='nav-item logo' onClick={back}><h1>Voice Tweet🐌</h1></div>
                    <ul role='navigation'>
                        <div className='nav-item'>
                            <Link to='/login'>Login</Link>
                            <button onClick={signUp}>Sign Up</button>
                        </div>
                        <button className='menu' onClick={showMenu}>Menu</button>
                    </ul>
                    <div className='menu-bg' onClick={closeMenu}>
                        <div className='menu-list'>
                            <button onClick={closeMenu}>Close</button>
                            <ul>
                                <li><Link to='/login' onClick={closeMenu}>Login</Link></li>
                                <li><Link to='/register' onClick={closeMenu}>Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>

                </nav>

                <div className='content'>
                    <h1><span>Voice</span> <span>Tweet🐌</span> <span className='orange'>Guides</span></h1>
                    <p>These are the terms and conditions adhered on this platform</p>
                    <button onClick={emailUs}>Contact Us</button>
                </div>
            </div>

            {/* guides */}
            <div className='guides'>
                <div className='conditions'>
                    <h2>conditions</h2>
                    <p>
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                    </p>
                </div>
                <div className='rules'>
                    <h2>conditions</h2>
                    <p>
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                        This platform offers freedom to network and social
                    </p>
                </div>
            </div>
         </div> 

         <Footer/>  
        </>
    );
}

export default Guide;