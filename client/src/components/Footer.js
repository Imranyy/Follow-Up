import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
            <footer>
                <div className='social-media-links'>
                    <h2>Social Media Links</h2>
                    <ul>
                        <li><a href='https://wa.me/+254754423664' target='_blank'>Whatsapp</a></li>
                        <li><a href='https://twitter.com/imran_matano' target='_blank'>Twitter</a></li>
                        <li><a href='https://instagram.com/imrany00' target='_blank'>Instagram</a></li>
                        <li>
                            <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="imrany-tech-60645323a" data-version="v1">
                                <a className="badge-base__link LI-simple-link" target='_blank' href="https://ke.linkedin.com/in/imranyy?trk=profile-badge">
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
    );
}

export default Footer;