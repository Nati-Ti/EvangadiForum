import React from 'react'
import './AccountSetting.css';


function AccountSetting() {
  return (
    <div className='AccountSetting'>
      <h3>ACCOUNT SETTINGS</h3>

      <div className='accountInfo__wrapper'>
        <label className='username__label'>Username</label>
            <br/>
          <input
              className="input__username"
              type="text"
              name="userName"
              // onChange={handleChange}
              placeholder="Username:"/>
        <br/>
        <label className='password__label'>Password</label>
          <br/>
        <input
            className="input__passwordToDelete"
            type="password"
            name="password"
            // onChange={handleChange}
            placeholder="Enter your password:"/>
      </div>

      <p className='delete__para'>Delete Account</p>
      <p className='delete__warn'>Once you delete your account, there is no going back. Please be certain.</p>
      <button className='delete__account'>Delete Account</button>
      
    </div>
  )
}

export default AccountSetting