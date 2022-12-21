import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router-dom';
import LoginNav from '../components/LoginNav';

function Detail({userUI, adminUI}) {
    const navigate=useNavigate();
    const {username}=useParams();
    const [userData,setUserData]=useState('');

    const getUserDetails=async()=>{
        try {
            preloader();
            const url=`http://localhost:5000/api/users/${username}`;
            const response=await fetch(url,{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            })
            preloaderOff();
            const parseRes=await response.json();
            if(parseRes.error){
                // toast.error(parseRes.error);
                navigate('/')
            }else{
                setUserData(parseRes);
            }
        } catch (error) {
            preloader();
            toast.error(error.message);
            navigate('/home');
        }
    }
    useEffect(()=>{
        getUserDetails();
    },[]);

    //preloader
  const preloader=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='block';
}
const preloaderOff=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='none';
}

    const logOut=()=>{
        toast.success('You have signed out')
        localStorage.removeItem('username');
        localStorage.removeItem('pic');
        localStorage.removeItem('email');
        localStorage.removeItem('userID');
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('adminToken');
        window.location.reload()
    }
    return (
        <>
        <div className='preload'></div>
            <LoginNav userUI={userUI} adminUI={adminUI}/>
            <div className='profile-page'>
            <div key={userData._id}>
                <h1>Pic {userData.pic}</h1>
                <h2>{userData.username}</h2>
                <h3>{userData.email}</h3>
                <button className='sign-out-btn' onClick={logOut} >Sign Out</button>
            </div>
            </div>
            
        </>
    );
}

export default Detail;