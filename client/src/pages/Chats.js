import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import LoginNav from '../components/LoginNav';
import img from '../assests/comp.png';
import img1 from '../assests/anime.png';

function Chats({userUI, adminUI}) {
    const [data,setData]=useState('');
    const [message,setMessage]=useState('');

   const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        //submitting message to API
        const url=`http:localhost:5000/api/upload`
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
            pic:localStorage.getItem('pic'),
            userID:localStorage.getItem('userID'),
            email:localStorage.getItem('email'),
            message
            }),
            headers:{
                'authorization':`Bearer ${sessionStorage.getItem('userToken')}`
            }
        })
        const parseRes=await response.json();
        if(parseRes.error){
            toast.error(parseRes.error)
        }else{
            toast.success(parseRes.msg);
        }
    } catch (error) {
        toast.error('Network Error')
    }
   }
    
    //get all data
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
            <div className='chat-page'>
                    <div className='chat-window'>
                        {data&&data.map(data=>{
                            if(data.username===localStorage.getItem('username')){
                                return(
                                    <div className='right'>
                                        <div key={data._id} className='card' title={`Sent on ${data.createdAt.slice(0,10)}`}>
                                            <div className='card-image'>
                                                <a href={`${img}`} target='_blank' rel='noopener'><img src={img} alt='.'/></a>
                                            </div>
                                            <div className='content'>
                                                <h3>You</h3>
                                                {/* <p>{data.pic}</p> */}
                                                <p>{data.message?data.message:'No message'}</p>
                                                <sub></sub><br/>
                                                <small style={{fontSzie:'12px',fontFamily:'monospace',paddingLeft:'14vw'}}>{data.createdAt.slice(11,16)}</small>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div  key={data._id} className='card' title={`Sent on ${data.createdAt.slice(0,10)}`}>
                                        <div className='card-image'>
                                                <a href={`${img1}`} target='_blank' rel='noopener'><img src={img1} alt='.'/></a>
                                            </div>
                                       <div className='content'>
                                            <h3>{data.username}</h3>
                                            {/* <p>{data.pic}</p> */}
                                            <p>{data.message?data.message:'No message'}</p>
                                            <small style={{fontSzie:'12px',fontFamily:'monospace',paddingLeft:'14vw'}}>{data.createdAt.slice(11,16)}</small>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea placeholder='Message' onChange={e=>setMessage(e.target.value)}></textarea>
                    <button>Send</button>
                </form>
            </div>
        </>
    );
}

export default Chats;