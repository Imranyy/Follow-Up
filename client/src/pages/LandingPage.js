import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function LandingPage(props) {
    const navigate=useNavigate()
    const signUp=()=>{
        navigate('/register')
    }
    return (
        <div className='land-page'>
            <div className='hero-image'>
                <nav className='nav'>
                    <div className='nav-item logo'><h1>Voice Tweet🐌</h1></div>
                    <ul className='nav-item' role='navigation'>
                        <Link to='/login'>Login</Link>
                        <button onClick={signUp}>Sign Up</button>
                    </ul>
                </nav>

                <div className='content'>
                    <h1>Connect with <span>different</span> people</h1>
                    <p>Essentially, This platform connects people and enable them to chat via voice text..!</p>
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;