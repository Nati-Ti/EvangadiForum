import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './SignUp.css'
import { UserContext } from "../../Context/UserContext";

const SignUp = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    
    //importing global state from context
    const [userData, setUserData] = useContext(UserContext);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //sending data to be registered in database
            await axios.post('http://localhost:4000/api/users/register', form);

            //once registered the login automatically so send the new user info to be logged in
            const loginRes = await axios.post('http://localhost:4000/api/users/login', {
                email: form.email,
                password: form.password
            });

            // set the global state with the new user info
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            //navigate to homepage once the user is signed up
            navigate("/");
        } catch (error) {
            console.log('problem ==>', error.response.data.msg);
        }
    }
    useEffect(() => {
        if (!userData.user) navigate('/signup');
    }, [userData.user]);

return (
  <div className="SignUp">
    <div className="signup__form">
      <h3 className="signup__title">Join the network</h3>
      <p className="signup__haveAcc">Already have an account?<Link to='/login'>Sign in</Link></p>
      <form className="signup__inputForm" onSubmit={handleSubmit}>
        <input
            className="input__email"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
        /><br />
          <div className="input__name">
          <input
              className="input__firstName"
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
          /><br />
          
          <input
              className="input__lastName"
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
          /><br />
          </div>

          <input
              className="input__userName"
              type="text"
              name="userName"
              onChange={handleChange}
              placeholder="User Name"
          /><br />

          <input
              className="input__password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
          /><br />
          <button className="signup__submit">Agree and join</button>
        </form>
        <p className="signup__terms">
          I agree to the <Link to="/">privacy policy</Link> and <Link to="/">terms of service.</Link>
          <br/><br/>
          <Link to="/login">Already have an account?</Link>
        </p>
        
      </div>

      <div className='signup__about'>
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
  );
};

export default SignUp;
