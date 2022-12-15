import './css/App.css';
import './css/responsive.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
  <Router>
    <Toaster/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/:id' element={<Detail/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes> 
  </Router>
  );
}
 
export default App;
