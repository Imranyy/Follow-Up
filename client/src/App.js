import './css/App.css';
import './css/responsive.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';
import Guide from './pages/Guide';

function App() {
  const [isUserAuth,setIsUserAuth]=useState('');
  const [isAdminAuth,setIsAdminAuth]=useState('');

  //check ui
  const checkUi=async()=>{
    if(sessionStorage.getItem('adminToken')){
      try {
        preloader()
        const url='http://localhost:5000/api/admins/verify';
        const response=await fetch(url,{
          method:"GET",
          headers:{
          "authorization":`Bearer ${sessionStorage.getItem('adminToken')}`
          }
        })
        preloaderOff()
        const parseRes=await response.json();
        if(parseRes.error){
          toast.error(parseRes.error)
        }else{
          parseRes===true?setIsAdminAuth(true):setIsAdminAuth(false)
        }
      } catch (error) {
        preloaderOff()
        toast.error('Network Error!')
      }
    } else{
        try {
          preloader()
            const url='http://localhost:5000/api/verify';
            const response=await fetch(url,{
              method:"GET",
              headers:{
              "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
              }
            })
            preloaderOff()
            const parseRes=await response.json();
            if(parseRes.error){
              toast.error(parseRes.error)
            }else{
              parseRes===true?setIsUserAuth(true):setIsUserAuth(false)
            }
          } catch (error) {
            preloaderOff()
            toast.error('Network Error!')
          }
    }
  }
  useEffect(()=>{
    checkUi();
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
  <Router>
  <div className='preload'></div>
    <Toaster/>
    <Routes>
      <Route path='/' element={isUserAuth||isAdminAuth?(<Home userUI={isUserAuth} adminUI={isAdminAuth}/>):(<LandingPage/>)}/>
      <Route path='/home' element={isUserAuth||isAdminAuth?(<Home userUI={isUserAuth} adminUI={isAdminAuth}/>):(<LandingPage/>)}/>
      <Route path='/login' element={isUserAuth||isAdminAuth?(<Home userUI={isUserAuth} adminUI={isAdminAuth}/>):(<SignIn userUI={isUserAuth} adminUI={isAdminAuth}/>)}/>
      <Route path='/register' element={isUserAuth||isAdminAuth?(<Home userUI={isUserAuth} adminUI={isAdminAuth}/>):(<SignUp userUI={isUserAuth} adminUI={isAdminAuth}/>)}/>
      <Route path='/guide' element={<Guide userUI={isUserAuth} adminUI={isAdminAuth}/>}/>
      <Route path='/user/:id' element={<Detail userUI={isUserAuth} adminUI={isAdminAuth}/>}/>
      <Route path='*' element={<NotFound userUI={isUserAuth} adminUI={isAdminAuth}/>}/>
    </Routes> 
  </Router>
  );
}
 
export default App;
