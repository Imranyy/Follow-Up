import './css/App.css';
import './css/responsive.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';

function App() {
  const [userAuth,setUserAuth]=useState(false);

  const verifyUser=async()=>{
    try {
      const url='http://localhost:5000/api/verify';
      const response=await fetch(url,{
        method:"GET",
        headers:{
        "authorization":`Bearer ${sessionStorage.getItem('userToken')}`
        }
      })
      const parseRes=await response.json();
      if(parseRes.error){
        toast.error(parseRes.error)
      }else{
        parseRes===true?setUserAuth(true):setUserAuth(false);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const verifyAdmin=async()=>{
    if(sessionStorage.getItem('adminToken')){
      try {
        const url='http://localhost:5000/api/admins/verify';
        const response=await fetch(url,{
          method:"GET",
          headers:{
          "authorization":`Bearer ${sessionStorage.getItem('adminToken')}`
          }
        })
        const parseRes=await response.json();
        if(parseRes.error){
          toast.error(parseRes.error)
        }else{
          console.log(parseRes);
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }
  useEffect(()=>{
    verifyAdmin();
    verifyUser();
  })
  return (
  <Router>
    <Toaster/>
    <Navbar userUi={userAuth}/>
    <Routes>
      <Route path='/' element={<Home userUi={userAuth}/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/audio/:id' element={<Detail/>}/>
      <Route path='*' element={<NotFound/>}/>
      {/* <Route path='/' element={<LandingPage/>}/> */}
    </Routes> 
  </Router>
  );
}
 
export default App;
