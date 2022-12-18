import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import mic from '../assests/mic.png';
import anime from '../assests/anime.png';
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
                    <h1><span>Connect</span> <span>with</span> <span className='orange'>different</span> <span>people</span></h1>
                    <p>Essentially, This platform connects people and enable them to chat via voice text..!</p>
                    <button>Get Started</button>
                </div>
            </div>

            <section className='enjoy-connection'>
                <article>
                    <img src={mic}/>
                </article>
                <article>
                    <h2>Enjoy while networking</h2>
                    <p>By signing up, you will get instant connections to over 50,000 people using this platform. In here, you will be able to network 
                        and know different people. You can refer your friends to this platform via your referral link,
                         share out your profile to different people so as to gain fame.<br/>
                        <Link to='/'>Learn more</Link>
                    </p>
                </article>
            </section>

            <section className='share-voice'>
                <article>
                    <h2>Share voice messages</h2>
                    <p>The primarial use of this platform is to send voice messages to a large audience.
                        The people receiving the messages might be potential buyers, friends, investors or work collegues. <br/>
                        <Link to='/'>Learn more</Link>
                    </p>
                </article>
                <article>
                    <img src={anime}/>
                </article>
            </section>
                <h1 className='testimonials-header'>testimonials</h1>
            <div className='testimonials'>
                <div className='card'>
                    <img src={mic} alt='..'/>
                    <p>
                        Hello, I have been using this platform for about six months now. I would say it's a good
                        platform in cases where you would like to chat with new people.
                        But it's good😍.
                    </p>
                    <h3>Lilian</h3>
                </div>
                <div className='card'>
                    <img src={mic} alt='..'/>
                    <p>
                        Hello, I have been using this platform for about six months now. I would say it's a good
                        platform in cases where you would like to chat with new people.
                        But it's good😍.
                    </p>
                    <h3>Lilian</h3>
                </div>
                <div className='card'>
                    <img src={anime} alt='..'/>
                    <p>
                        Hello, I have been using this platform for about six months now. I would say it's a good
                        platform in cases where you would like to chat with new people.
                        But it's good😍.
                    </p>
                    <h3>Lilian</h3>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;