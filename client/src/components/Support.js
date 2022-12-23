import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coffee from '../assests/beverage.png';

function Support(props) {
    const navigate=useNavigate();
    const [phone,setPhone]=useState('');
    const [amount,setAmount]=useState('');
    const [error,setError]=useState('');
    const [submitBtn,setSubmitBtn]=useState(<button style={{background:'rgb(9, 78, 78)',color:'white'}} className="btn">Submit</button>);
    const form=document.querySelector('.form');
    const submit=async(e)=>{
        e.preventDefault();
        try {
            const validNumber=(userNumber)=>{
                return /^[0]\d{2}\d{3}\d{4}$/.test(userNumber);
            }
            let phoneNumber=validNumber(phone);

            if(amount<=0){
                setError(
                <div style={{color:"orangered"}}>
                    Please Enter amount above 0
                </div>
                )
            }else if(!phoneNumber){
                setError(
                    <div style={{color:"orangered"}}>
                        Please Enter phone number in 07xxxxxxxx
                    </div>
                    )
            }else{
                setSubmitBtn(<button className="btn btn-disabled">Submitting...🚀</button>);
                setError('');
            const url='https://tinypesa.com/api/v1/express/initialize';
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    amount:amount,
                    msisdn:phone
                }),
                headers: {
                    Apikey: "9qG6Ltgzgbn",//apikey get it from your admin account
                    "Content-Type": "application/json",
                    },
            })
            setTimeout(()=>{
                setError(
                    <div style={{color:"green"}}>
                        <i>Done...</i>
                    </div>
                    )
            },10000)
            const parseRes=await response.json()
            console.log(parseRes);
            setError(
                <div style={{color:"green"}}>
                    <i>Sending STK Push to phone...</i>
                </div>
                )
                setSubmitBtn(<button style={{background:'rgb(9, 78, 78)',color:'white'}} className="btn">Submit</button>)
                setTimeout(()=>{
                    navigate('/')
                },25000)
            }
        } catch (error) {
           setTimeout(()=>{
            setError(
                <div style={{color:"orangered"}}>
                    Failed..Check your connection and Try again!
                </div>
                )
           },5000)
           setSubmitBtn(<button style={{background:'rgb(9, 78, 78)',color:'white'}} className="btn">Submit</button>)
                form.reset();
            console.log(error)
        }
    }
    setTimeout(()=>{
        document.querySelector('.support').style.display='block'
    },10000);

    const closeSupport=()=>{
        document.querySelector('.support').style.display='none'
    }
    return (
        <div className='support' >
            <div className='card'>
                <button className='close' onClick={closeSupport}>Close</button>
                <div style={{display:'flex'}}>
                    <img style={{marginBottom:'20px',marginTop:'-15px'}} width='50' heigth='30' src={coffee} alt='.'/>
                    <h2>Be a patron...</h2>
                </div>
                <form className='form' onSubmit={submit} >
                    {error}
                    <div className='mb-3'>
                        <input type='number' className='form-control' placeholder='phone number...07xxxxxxxx' onChange={(e)=>{setPhone(e.target.value)}} required/>
                    </div>
                    <div className='mb-3'>
                        <input type='number' className='form-control' placeholder='amount' onChange={(e)=>{setAmount(e.target.value)}} required/>
                    </div>
                    {submitBtn}
                </form>
            </div>
        </div>
    );
}

export default Support;