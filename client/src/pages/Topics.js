import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import LoginNav from '../components/LoginNav';
import img1 from '../assests/anime.png';

function Topics({userUI, adminUI}) {
    const [data,setData]=useState('');
    //get Topics
    const getData=async()=>{
        try{
            preloader()     
            const url='http://localhost:5000/api/topics';
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
                <h2>Topics</h2>{sessionStorage.getItem('userToken')?(<sub>(Only admins can add topics)</sub>):(<></>)}

                <div className='chat-window'>
                    {data&&data.map(data=>(
                        <div key={data._id} className='card' title={`Sent on ${data.createdAt.slice(0,10)} by ${data.adminname}`}>
                            <div className='card-image'>
                                <a href={`${img1}`} target='_blank' rel='noopener'><img src={img1} alt='.'/></a>
                            </div>
                            <div className='content'>
                                <div style={{display:'flex',justifyContent:'space-between'}}><h3>Topic</h3> <small>Added on {data.createdAt.slice(0,10)}</small></div><br/>
                                <p>#{data.message?data.message:'No message'}</p>
                                <small style={{fontSzie:'12px',fontFamily:'monospace',paddingLeft:'14vw'}}>{data.createdAt.slice(11,16)}</small>
                            </div>
                           </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Topics;