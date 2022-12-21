import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import LoginNav from '../components/LoginNav';

function Topics({userUI, adminUI}) {
    const [data,setData]=useState('');
    //get Topics
    const getData=async()=>{
        try{
            preloader()     
            const url='http://localhost:5000/api/data';
            const response=await fetch(url,{
                method:"GET"
            })
            preloaderOff()
            const parseRes=await response.json();
            setData(parseRes)
        }catch(err){
            preloaderOff()
            toast.error('Network Error!')
        }
    } 
    
    useEffect(()=>{
        getData()
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
    return (
        <>
        <div className='preload'></div>
        <LoginNav userUI={userUI} adminUI={adminUI}/>
            <div className='topics-page'>
                <h2>Topics</h2>
            </div>
        </>
    );
}

export default Topics;