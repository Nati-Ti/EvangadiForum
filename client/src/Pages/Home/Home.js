import './Home.css'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Header from '../../Components/Header/Header';

const Home = ({ logout }) => {
    const [userData, setUserData] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUserData({
            token: '',
            user: ''
        });
    }


    useEffect(() => {
        if (!userData.user) navigate("/login");
    }, [userData.user, navigate]);

    return (
        <div className='Home'>
            <Header />

            <h1>WelCome {userData.user?.display_name}</h1>

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home