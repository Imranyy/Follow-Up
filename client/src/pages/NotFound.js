import React from 'react';
import { Link } from 'react-router-dom';
import LoginNav from '../components/LoginNav';

function NotFound({userUI, adminUI}) {
    return (
    <>
        <LoginNav userUI={userUI} adminUI={adminUI}/>
        <div className='not-found'>
            <div>
                <h2>Oops...This page doesn't exit</h2>
            </div>
            <div>
                <Link to='/'>Go back Home page.</Link>
            </div>
        </div>
    </>
    );
}

export default NotFound;