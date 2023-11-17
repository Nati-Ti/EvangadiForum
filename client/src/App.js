import React, { useContext, useEffect } from 'react';
import './App.css';
import { UserContext } from './Context/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import Answer from './Pages/Answer/Answer';
import MyQuestion from './Pages/MyQuestion/MyQuestion';

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
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/askQuestion" element={ <AskQuestion/> } />
        <Route path="/myQuestion" element={ <MyQuestion/> } />
        <Route path="/question/answer" element={ <Answer/> } />
        <Route path="/" element={ <Home/> } />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;