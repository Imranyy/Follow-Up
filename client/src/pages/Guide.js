import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { AiOutlineCloseSquare, AiOutlineMenu} from "react-icons/ai";

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
        window.location.href=`mailto:imranmat254@gmail.com?subject=Message from a User in Follow Up🐌 concerning platform guides`
    }
    const back=()=>{
        navigate('/')
    }
    return (
        <>
         <div className='guide-page'>
            <div className='hero-image'>
                <nav className='nav'>
                    <div className='nav-item logo' onClick={back}><h1>Follow Up🐌</h1></div>
                    <ul role='navigation'>
                        <div className='nav-item'>
                            <Link to='/login'>Login</Link>
                            <button onClick={signUp}>Sign Up</button>
                        </div>
                        <button className='menu' onClick={showMenu}><AiOutlineMenu/></button>
                    </ul>
                    <div className='menu-bg' onClick={closeMenu}>
                        <div className='menu-list'>
                            <button onClick={closeMenu}><AiOutlineCloseSquare/></button>
                            <ul>
                                <li><Link to='/login' onClick={closeMenu}>Login</Link></li>
                                <li><Link to='/register' onClick={closeMenu}>Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>

                </nav>

                <div className='content'>
                    <h1><span>Follow</span> <span>Up🐌</span> <span className='orange'>Guides</span></h1>
                    <p>These are the terms and conditions adhered on this platform</p>
                    <button onClick={emailUs}>Contact Us</button>
                </div>
            </div>

            {/* guides */}
            <div className='guides'>
                <div className='conditions'>
                    <h2>conditions</h2>
                    <p>
                        This platform offers the freedom of networking and socializing therefore we've set specific guides to govern users
                        from engaging in immoral behavior on our platform. Please read thes guides before signing up into the platform.
                        <ul>
                            <li>Must be 14 years and above.</li>
                            <li>Should not send offensive texts or found sending ill messages, actions will be taken if you send ill words.</li>
                            <li>Should be willing to socialize and know different new people.</li>
                            <li>Any malicious attempt done on this platform will be report to authority.</li>
                            <li>Topics discussed in this platform are governed by admin accounts, therefore topics discussed would not be biased.</li>
                        </ul> 
                       
                    </p>
                </div>
                <div className='rules'>
                    <h2>Benefits</h2>
                    <p>
                       <ul>
                            <li>Offers freedom of speech.</li>
                            <li>It's a socializing platform.</li>
                            <li>the platform is secured and every data is controlled by the users.</li>
                            <li>Users enjoy and mostly are friendly.</li>
                            <li>Supports kenyan talents on software development.</li>
                       </ul>
                    </p>
                </div>
            </div>
         </div> 

         <Footer/>  
        </>
    );
}

export default Guide;