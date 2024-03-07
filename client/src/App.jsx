import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OurTeam from './pages/OurTeam';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <BrowserRouter>
      <Header />      
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/teams' element={<OurTeam />} />

        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path="/create-post" element={<CreatePost/>} /></Route>

        
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        
      </Routes>

    </BrowserRouter>
  );
}
