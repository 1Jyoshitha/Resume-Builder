import './App.css';
import {Routes,Route} from 'react-router-dom'
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/Signup';
import LogIn from './pages/login/LogIn'
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Privacy from './pages/privacy/Privacy';
import Craft from './pages/craft/Craft';
import Profile from './pages/userProfile/Profile';
import EditProfile from './pages/editProfile/EditProfile';
function App() {
  return (
   <>
     <Routes>
      <Route path='/homepage' element={<Homepage/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/craft' element={<Craft/>} />
      <Route path='/' element={<LogIn/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/privacy' element={<Privacy/>} />
      <Route path='/user-profile' element={<Profile/>} />
      <Route path='/edit-profile/:id' element={<EditProfile/>} />
      <Route path='*' element={<h1>Page not found</h1>}/>
     </Routes>
   </>
  );
}

export default App;
