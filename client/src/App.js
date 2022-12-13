import './css/App.css';
import './css/responsive.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddPodcast from './pages/AddPodcast';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
function App() {
  return (
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/:id' element={<Detail/>}/>
      <Route path='/add' element={<AddPodcast/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes> 
  </Router>
  );
}
 
export default App;
