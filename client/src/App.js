import React, { useContext, useEffect } from 'react';
import './App.css';
import { UserContext } from './Context/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import MyQuestion from './Pages/MyQuestion/MyQuestion';
import Answers from './Pages/AllAnswers/Answers';
import Answer from './Pages/Answer/Answer';
import UserProfile from './Pages/UserProfile/UserProfile';

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');

    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else {
      try {
        const userRes = await axios.get('http://localhost:4000/api/users', {
          headers: { 'x-auth-token': token },
        });

        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        // Handle error if unable to fetch user data
        console.log('Error fetching user data:', error);
      }
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
  <Header />
  <Routes>
    <Route path="/signup" element={<SignUp />} />

    <Route path="/askQuestion" element={
        userData.user ? (<AskQuestion />) : (
          <Navigate to="/login" replace />)}/>
    
    <Route path="/myQuestion" element={
        userData.user ? (<MyQuestion />) : (
          <Navigate to="/login" replace />)}/>
    
    <Route path="/question/allanswers" element={
        userData.user ? (<Answers />) : (
          <Navigate to="/login" replace />)}/>

    <Route path="/question/answer" element={
        userData.user ? (<Answer />) : (
          <Navigate to="/login" replace />)}/>

    <Route path="/profile" element={
        userData.user ? (<UserProfile />) : (
          <Navigate to="/login" replace />)}/>

    <Route path="/login" element={<Login />} />
    <Route path="/" element={
        userData.user ? (<Home />) : (
          <Navigate to="/login" replace />)}/>
  </Routes>
  <Footer />
</Router>
  );
}

export default App;