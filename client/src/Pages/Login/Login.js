import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import './Login.css'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {

    const [userData, setUserData] = useContext(UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

		const handleGuestSignIn = async () => {
			
			try {
				const loginRes = await axios.post('http://localhost:4000/api/users/login',
						{
								email: 'guest@gmail.com',
								password: '12345678'
						});
				
				//update global state with response from backend(user-info)
				setUserData({
						token: loginRes.data.token,
						user: loginRes.data.user
				});

				//set localStorage with the token
				localStorage.setItem('auth-token', loginRes.data.token);

				//navigate user to homepage
				navigate('/');
		} catch (err) {
				console.log('problem', err.response.data.msg);
				alert(err.response.data.msg);
		}
		}

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //sending user data to database to be logged in
            const loginRes = await axios.post('http://localhost:4000/api/users/login',
                {
                    email: form.email,
                    password: form.password
                });
            
            //update global state with response from backend(user-info)
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            //navigate user to homepage
            navigate('/');
        } catch (err) {
            console.log('problem', err.response.data.msg);
            alert(err.response.data.msg);
        }
    }

    useEffect(() => {
        if (userData.user) navigate('/');
				// else{
				// 	navigate('/hello')
				// }
    }, [userData.user]);

	return (
		<div className='Login'>
			<div className='login__form'>
				<h3 className='login__title'>Login to your account</h3>
				<p className='login__newAcc'>Don't have an account?
				<Link to="/signup">Create a new account</Link>
				</p>
				<form className='login__inputs' onSubmit={handleSubmit}>
						{/* <label>Email: </label> */}
						<input
								className='email__input'
								type="text"
								name="email"
								onChange={handleChange}
								placeholder='Your email'
						/><br />
						{/* <label>Password: </label> */}
						<input
								className='pass__input'
								type="password"
								name="password"
								onChange={handleChange}
								placeholder='Your Password'
						/>
						<br />
						<button><strong>Submit</strong></button>
				</form>
				<Link to="/signup">Create an account?</Link>
				<p onClick={handleGuestSignIn} className='login__guest'>Continue as a Guest</p>
			</div>

			<div className='login__about'>
				<p className='about__link'><Link to="/">About</Link></p>
				<h1 className='about__title'>Evangadi Networks Q&A</h1>
				<p className='about__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi risus, molestie in risus nec, tincidunt consectetur nisl. 
				<br/> <br/>
				Sed dignissim sapien in auctor fringilla. Fusce ut purus mauris. Ut et tristique purus, nec hendrerit tellus. Praesent in dignissim ante. Fusce hendrerit augue sed facilisis cursusx, feugiat vel nisl ut, aliquam finibus massa.
				<br/> <br/>
				Vivamus sodales lacus ut lacus mollis, sit amet vehicula eros malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt erat.</p>

				<button className='about__button'>HOW IT WORKS</button>
			</div>
		</div>
	)
}

export default Login