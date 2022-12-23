import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin, AiFillPhone, AiOutlineMail, AiOutlineTwitter, AiOutlineWhatsApp } from "react-icons/ai";

function Footer(props) {
    return (
            <footer>
                <div className='social-media-links'>
                    <h2>Social Media Links</h2>
                    <ul>
                        <li><a href='https://wa.me/+254754423664' target='_blank'><AiOutlineWhatsApp/> Whatsapp</a></li>
                        <li><a href='https://twitter.com/imran_matano' target='_blank'><AiOutlineTwitter/> Twitter</a></li>
                        <li><a href='https://instagram.com/imrany00' target='_blank'><AiFillInstagram/> Instagram</a></li>
                        <li><a href='tel:0754423664' target='_blank' rel='noreferrer'><AiFillPhone/> Call</a></li>
                        <li><a href='mailto:imranmat254@gmail.com' target='_blank' rel='noreferrer'><AiOutlineMail/> Email</a></li>
                        <li><a target='_blank' rel='noreferrer' href="https://ke.linkedin.com/in/imranyy"><AiFillLinkedin/> LinkedIn</a></li>
                    </ul>
                </div>
                <div className='quick-links'>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link to='/register'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/'>Home page</Link></li>
                        <li><Link to='/guide'>Guide Lines</Link></li>
                    </ul>
                </div>
            </footer>
    );
}

export default Footer;