import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Detail({userUI, adminUI}) {
    const navigate=useNavigate();
    const {id}=useParams();
    const [userData,setUserData]=useState('');

    const getUserDetails=async()=>{
        try {
            const url=`http://localhost:5000/api/users/${id}`;
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            })
            const parseRes=await response.json();
            if(parseRes.error){
                toast.error(parseRes.error);
                navigate('/')
            }else{
                setUserData(parseRes);
            }
        } catch (error) {
            toast.error(error.message);
            navigate('/home');
        }
    }
    useEffect(()=>{
        getUserDetails();
    },[]);

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
            <Navbar userUI={userUI} adminUI={adminUI}/>
            <div className='start profile-page'>
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