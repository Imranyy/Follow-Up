import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
    return (
        <div className='start '>
            <h2>Oops...This page doesn't exit</h2>
            <Link to='/'>Go back Home page.</Link>
        </div>
    );
}

export default NotFound;