import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SignUp({userUI,adminUI}) {
    const navigate=useNavigate();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [file,setFile]=useState('');
    const [confirmPassword,setConfirmPasword]=useState('');

    const handleRegister=async(e)=>{
        e.preventDefault();
      try {
        if(password===confirmPassword){
            if(window.confirm("MAKE SURE YOU'VE READ OUR TERMS AND CONDITIONS BEFORE SIGNING UP!!")){
                try {
                    const url=`http://localhost:5000/api/register`;
                    const response= await fetch(url,{
                        method:"POST",
                        body:JSON.stringify({
                            pic:1,
                            username,
                            email,
                            password:confirmPassword
                        }),
                        headers:{
                            "content-type":"application/json"
                        }
                    })
                    const parseRes=await response.json();
                    if(parseRes.error){
                        toast.error(parseRes.error);
                        document.querySelector('form').reset()
                    }else{
                        toast.success(parseRes.msg);
                        localStorage.setItem('userID',parseRes._id);
                        localStorage.setItem('pic',parseRes.pic);
                        localStorage.setItem('username',parseRes.username);
                        localStorage.setItem('email',parseRes.email);
                        sessionStorage.setItem('userToken',parseRes.token);
                        navigate('/');
                        setTimeout(()=>{
                            window.location.reload()
                        },200)
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }else{
                navigate('/guide')
            }
           }else{
            toast.error("Password doesn't match ☠!")
           }
      } catch (error) {
        toast.error("Network Error!")
      }
    }
    return (
        <>
        <Navbar/>
            <div className='sign-in '>
                <form onSubmit={handleRegister}>
                    <label>Username</label>
                    <input type='text' placeholder='Kevin' onChange={e=>setUsername(e.target.value)} required/>
                    <label>Email</label>
                    <input type='email' placeholder='example@gmail.com' onChange={e=>setEmail(e.target.value)} required/>
                    <label>Password</label>
                    <input type='password' onChange={e=>setPassword(e.target.value)} required/>
                    <label>Confirm Password</label>
                    <input type='password' onChange={e=>setConfirmPasword(e.target.value)} required/>
                    <label>Upload your avatar</label>
                    <input type='file' accept='image/x-png, image/jpg, image/jpeg' onChange={e=>setFile(e.target.value)} required/>
                    <div className='link-btn'>
                        <button>Submit</button> <Link to='/login'>I have an account?</Link>
                    </div>
                </form>
            </div>   
        </>
    );
}

export default SignUp;