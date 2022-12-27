import React from 'react';
import LoginNav from '../components/LoginNav';
import img1 from '../assests/msg1.png';

function Topics({userUI, adminUI, data}) {
    return (
        <>
        {/* <div className='preload'></div> */}
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
                                <div style={{display:'flex',justifyContent:'space-between'}}><h3>Topic</h3> <small style={{padding:'0 5px 0 20vw'}}>Added on {data.createdAt.slice(0,10)}</small></div><br/>
                                <p>#{data.message?data.message:'No message'}</p>
                            <small style={{fontSzie:'12px',fontFamily:'monospace',padding:'14vw 5px 0 40vw'}}>{data.createdAt.slice(11,16)}</small>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Topics;