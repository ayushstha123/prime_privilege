import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OurTeam from './pages/OurTeam';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import DashPosts from './components/DashPosts';
import UpdatePost from './pages/UpdatePost';
import DashUsers from './components/DashUsers';
import PostPage from './pages/PostPage';
import IdentityCard from './pages/IdentityCard.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/resetPassword.jsx';
import DashBoard from './components/DashBoard.jsx';
import OnlyBusinessRoute from './components/OnlyBusinessRoute.jsx';
import Search from './pages/Search.jsx';
import BusinessSignUp from './pages/BusinessSignUp.jsx';
import BusinessSignIn from './pages/BusinessSignIn.jsx';
import DashUsage from './components/DashUsage.jsx';
import DashAllUsage from './components/DashAllUsage.jsx';
import DashBusiness from './components/BusinessDashboard.jsx';
import Products from './pages/Products.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/business-signup' element={<BusinessSignUp />} />
        <Route path='/business-signin' element={<BusinessSignIn />} />
        <Route path='/search' element={<Search />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset_password/:id/:token' element={<ResetPassword/>} />

        <Route path='/teams' element={<OurTeam />} />
        <Route path='/sign-up' element={<SignUp />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/identity-card' element={<IdentityCard />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        
  <Route element={<OnlyBusinessRoute />}>
  <Route path="/products" element={<Products />} />
          <Route path="/business-usage" element={<DashUsage />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/posts" element={<DashPosts />} />

        </Route>
       
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/getbusiness" element={<DashBusiness />}/>
          <Route path="/getusers" element={<DashUsers />}/>
          <Route path="/getallusage" element={<DashAllUsage />}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path="/posts" element={<DashPosts />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />

      </Routes>
    </BrowserRouter>
  );
}
