import React,{useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';
import LoginNav from '../components/LoginNav';
import io from 'socket.io-client';

const socket=io.connect('https://follow-up-api-production.up.railway.app/')
function Chats({userUI, adminUI}) {
    const [data,setData]=useState('');
    const [message,setMessage]=useState('');
    const[out,setOut]=useState('')

   const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        socket.emit('chat',{
            userID:localStorage.getItem('userID'),    
            pic:localStorage.getItem('pic'),
            username:localStorage.getItem('username'),
            message:message
        });
        toast.success("Message Sent")
        socket.on('chat',data=>{
            setOut(data);
        })
        document.querySelector('form').reset()
    } catch (error) {
        toast.error('Network Error')
    }
   }
    
    useEffect(()=>{
         //getting chats
         socket.emit('output','hy')
         socket.on('output',res=>{
         preloader()     
             setData(res);
             preloaderOff()
            })

        },[data]);

       const down=()=>{
            document.querySelector('.down').scrollIntoView()
        }
        
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
            <div className='chat-page' onLoad={down}>
                    <div className='chat-window'>
                        {data&&data.map(data=>{
                            if(data.username===localStorage.getItem('username')){
                                return(
                                        <div className='right' key={data._id}>
                                        <div className='card' title={`Sent on ${data.createdAt.slice(0,10)}`}>
                                            <div className='card-image'>
                                                <a href={`${data.pic}`} target='_blank' rel='noopener'><img src={data.pic} alt='.'/></a>
                                            </div>
                                            <div className='content'>
                                                <h3>You</h3>
                                                <p>{data.message?data.message:'No message'}</p>
                                                <sub></sub><br/>
                                                <small style={{fontSzie:'12px',fontFamily:'monospace',padding:'14vw 5px 0 45vw'}}>{data.createdAt.slice(11,16)}</small>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div  key={data._id} className='card' title={`Sent on ${data.createdAt.slice(0,10)}`}>
                                        <div className='card-image'>
                                                <a href={`${data.pic}`} target='_blank' rel='noopener'><img src={data.pic} alt='.'/></a>
                                            </div>
                                       <div className='content'>
                                            <h3>{data.username}</h3>
                                            <p>{data.message?data.message:'No message'}</p>
                                            <small style={{fontSzie:'12px',fontFamily:'monospace',padding:'14vw 5px 0 45vw'}}>{data.createdAt.slice(11,16)}</small>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        
                </div>
                        <div className='down'></div>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder='Message' onChange={e=>setMessage(e.target.value)} autoCorrect="true" autoComplete="true"></textarea>
                    <button>Send</button>
                </form>
            </div>
        </>
    );
}

export default Chats;