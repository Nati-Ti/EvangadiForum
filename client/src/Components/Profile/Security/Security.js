import React, { useContext, useState } from 'react'
import './Security.css';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';

function Security() {

  const [userData, setUserData] = useContext(UserContext);
  const [newSecurity, setNewSecurity] = useState('');

  
  const [ error, setError ] = useState('');
  const [ successShow, setSuccessShow ] = useState(false);

  const handleChange = (e) => {
    setNewSecurity({ ...newSecurity, userId: userData.user.id, [e.target.name]: e.target.value });
    setSuccessShow(false);
  }

  const handleSubmit = async () => {
    try { 
      await axios.put(`http://localhost:4000/api/users/security`, newSecurity);
    } catch (error) {
      setError(() => error);
      console.log('problem ==>', error.response.data.msg);
    }

    setSuccessShow(true);
  }

  return (
    <div  className='Security'>
      <h3>SECURITY SETTINGS</h3>

      <div className='passwordChange__wrapper'>
        <label className='changePass__label'>Change Password</label>
          <br/>
        <input
            className="input__password"
            type="password"
            name="currentPassword"
            onChange={handleChange}
            placeholder="Enter your old password"/>
          <br/>
        <input
            className="input__password"
            type="password"
            name="newPassword"
            onChange={handleChange}
            placeholder="New password"/>
          <br/>
        <input
            className="input__password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm new password"/>
      </div>
      {(!error && successShow) ?
        <div className='profPicUpdate__success'>
          <img src='https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png' alt='successIcon' />
          <p>Account Security Has been Changed!</p>
        </div>
        : null
      }
      <button disabled={successShow} onClick={handleSubmit} className='submit__passwordChange'>Change Password</button>
    </div>
  )
}

export default Security