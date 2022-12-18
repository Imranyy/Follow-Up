import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import mic from '../assests/mic.png';
import anime from '../assests/anime.png';
import { toast } from 'react-hot-toast';
function LandingPage(props) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');
    const signUp=()=>{
        navigate('/register')
    }
    const handleEmail=async(e)=>{
        e.preventDefault();
        try {
            
        } catch (error) {
            toast.error('Message not sent!')
        }
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
                    <button onClick={signUp}>Get Started</button>
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
                        <Link to='/guide'>Learn more</Link>
                    </p>
                </article>
            </section>

            <section className='share-voice'>
                <article>
                    <h2>Share voice messages</h2>
                    <p>The primarial use of this platform is to send voice messages to a large audience.
                        The people receiving the messages might be potential buyers, friends, investors or work collegues. <br/>
                        <Link to='/guide'>Learn more</Link>
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
                    <div className='card-footer'>
                        <h3>Lilian</h3> <Link to='/'>Visit my profile</Link>
                    </div>
                </div>
                <div className='card'>
                    <img src={mic} alt='..'/>
                    <p>
                        Hello, I have been using this platform for about six months now. I would say it's a good
                        platform in cases where you would like to chat with new people.
                        But it's good😍.
                    </p>
                    <div className='card-footer'>
                        <h3>Lilian</h3> <Link to='/'>Visit my profile</Link>
                    </div>
                </div>
                <div className='card'>
                    <img src={anime} alt='..'/>
                    <p>
                        Hello, I have been using this platform for about six months now. I would say it's a good
                        platform in cases where you would like to chat with new people.
                        But it's good😍.
                    </p>
                    <div className='card-footer'>
                        <h3>Lilian</h3> <Link to='/'>Visit my profile</Link>
                    </div>
                </div>
            </div>

            <h1 className='testimonials-header'>Talk to Us</h1>
            <div className='talk-to-us'>
                <div className='content'>
                    <h2>Send us an email</h2>
                    <p>If you face any technical issue, contact us by filling the form and submitting.</p>
                    <h2>For Business talks</h2>
                    <p>Contact us, if you are a client looking for a web developer to hire, for your business, organization or a social website.</p>
                </div>
                <form onSubmit={handleEmail}>
                    <label>Name</label>
                    <input type='text' placeholder='John' onChange={e=>setName(e.target.value)} required/>
                    <label>Email</label>
                    <input type='email' placeholder='john@gmail.com' onChange={e=>setEmail(e.target.value)} required/>
                    <label>Message</label>
                    <textarea placeholder='Hello,..' onChange={e=>setMessage(e.target.value)} required></textarea>
                    <button>Submit</button>
                </form>
            </div>

            <footer>
                <div className='social-media-links'>
                    <h2>Social Media Links</h2>
                    <ul>
                        <li><a href='https://wa.me/+254754423664' target='_blank'>Whatsapp</a></li>
                        <li><a href='https://twitter.com/imran_matano' target='_blank'>Twitter</a></li>
                        <li><a href='https://instagram.com/imrany00' target='_blank'>Instagram</a></li>
                        <li>
                            <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="imrany-tech-60645323a" data-version="v1">
                                <a class="badge-base__link LI-simple-link" href="https://ke.linkedin.com/in/imranyy?trk=profile-badge">
                                    LinkedIn
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='quick-links'>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to='/register'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/guide'>Guide Lines</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;