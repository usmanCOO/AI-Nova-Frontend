// import logo from './logo.svg';
import './App.css';
import SummarizedArticles from './pages/articles/SummarizedArticles';
import MySearchHistory from './pages/history/MySearchHistory';
import MyLinks from './pages/links/MyLinks';
import Login from './pages/login/Login';
import MyAccount from './pages/myaccount/MyAccount';
import ForgetPassword from './pages/password/ForgetPassword';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import Otp from './pages/password/Otp';
import ConfirmPassword from './pages/password/ConfirmPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/password' element={<ForgetPassword />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/confirmpassword' element={<ConfirmPassword />} />
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/history' element={<MySearchHistory />} />
        <Route path='/links' element={<MyLinks />} />
        <Route path='/articles' element={<SummarizedArticles />} />
      </Routes>
    </>
  );
}

export default App;
