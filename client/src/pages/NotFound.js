import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NotFound(props) {
    return (
    <>
        <Navbar />
        <div className='start '>
            <h2>Oops...This page doesn't exit</h2>
            <Link to='/'>Go back Home page.</Link>
        </div>
    </>
    );
}

export default NotFound;