import React from 'react'
import './Security.css';

function Security() {
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
            // onChange={handleChange}
            placeholder="Enter your old password"/>
          <br/>
        <input
            className="input__password"
            type="password"
            name="newPassword"
            // onChange={handleChange}
            placeholder="New password"/>
          <br/>
        <input
            className="input__password"
            type="password"
            name="confirmNewPassword"
            // onChange={handleChange}
            placeholder="Confirm new password"/>
      </div>
      <button className='submit__passwordChange'>Change Password</button>
    </div>
  )
}

export default Security