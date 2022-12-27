import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function Users({userUI, adminUI}) {
    const [data,setData]=useState([]);
    const [search,setSearch]=useState('');
    const loggedinLink=document.querySelectorAll('.logged-in');
    const loggedoutLink=document.querySelectorAll('.logged-out');
      
    const getUsers=async()=>{
        try {
            const url='https://follow-up-api.onrender.com/api/users';
            const response=await fetch(url,{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            })
            const parseRes=await response.json();
            if(parseRes.error){
                toast.error(parseRes.error);
            }else{
                setData(parseRes);
            }
        } catch (error) {
            toast.error('Network Error');
        }
    }
    useEffect(()=>{
        getUsers();
    },[])
    
 if(userUI===false){
  loggedinLink.forEach(item=>item.style.display='none')
  loggedoutLink.forEach(item=>item.style.display='block')
}else if(userUI===true){
  loggedinLink.forEach(item=>item.style.display='block')
  loggedoutLink.forEach(item=>item.style.display='none')
}
const closeUsers=()=>{
    document.querySelector('.bg').classList.remove('show')
}

//filtering search data
const handleSearch=(e)=>{
    document.querySelector('.all-data').style.display='none'
    const value=e.target.value;
    let result = [];
    result = data.filter;
    result = data.filter((data) => {
     return data.username.search(value) !==-1; //filter
    });
    const $data=result.map(data=>{
        if(data.username!==localStorage.getItem('username')){
            return(
                <div className='card' key={data._id}>
                    <div className='card-image'>
                        <a href={data.pic} target='_blank' rel='noreferrer'><img src={data.img} alt='.'/></a>
                    </div>
                    <div className='content'>
                        <p>{data.username}</p>
                        <p>{data.bio?data.bio:(<sub>No bio</sub>)}</p>
                        <sub style={{fontSize:'10px',fontFamily:'monospace'}}>Joined {data.createdAt.slice(0,10)}</sub>
                    </div>
                </div>
            )
        }
    })
    setSearch($data);
}
//mapping the users excluding the user client
const $Data=data.map(data=>{
    if(data.username!==localStorage.getItem('username')){
        return(
            <div className='card' key={data._id}>
                <div className='card-image'>
                    <a href={data.pic} target='_blank' rel='noreferrer'><img src={data.pic} alt='.'/></a>
                </div>
                <div className='content'>
                    <p>{data.username}</p>
                    <p>{data.bio?data.bio:(<sub>No bio</sub>)}</p>
                    <sub style={{fontSize:'10px',fontFamily:'monospace'}}>Joined {data.createdAt.slice(0,10)}</sub>
                </div>
            </div>
        )
    }
})
    
    return (
        <>
            <div className='bg' onDoubleClick={closeUsers}>
                <div className='all-users-page logged-in' style={{display:'none'}}>
                    <input type='search' placeholder='&#128269;  Search' onChange={handleSearch}/>
                    <div className='all-data'>{$Data}</div>
                    {search}
                </div>
            </div>
        </>
    );
}

export default Users;