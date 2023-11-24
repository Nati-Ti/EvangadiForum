import React from 'react'
import './ProfileInfo.css';


function ProfileInfo() {
  return (
    <div className='ProfileInfo'>
      <h3>PROFILE INFORMATION</h3>

      <form className="profileInfo__form" >
        <div className='name__info'>
          <div>
            <label className='label'>First Name</label>
            <br/>
            <input
                className="input__fName"
                type="text"
                name="firstName"
                // onChange={handleChange}
                placeholder="First Name:"
                readOnly/>
          </div>

          <div>
            <label className='label'>Last Name</label>
            <br/>
            <input
                className="input__lName"
                type="text"
                name="lastName"
                // onChange={handleChange}
                placeholder="Last Name:"
                readOnly/>
          </div>
          
        </div>
        
            
        <div className="bio__info">
          <label className='label'>Bio</label>
          <br/>
          <input
              className="input__bio"
              type="text"
              name="bio"
              // onChange={handleChange}
              placeholder="Your Bio:"/>
        </div>

        <div className="url__info">
          <label className='label'>URL</label>
          <br/>
          <input
              className="input__url"
              type="text"
              name="url"
              // onChange={handleChange}
              placeholder="Website URL:"/>
        </div> 

        <div className="occupation__info">
          <label className='label'>Occupation</label>
          <br/>
          <input
              className="input__occupation"
              type="text"
              name="occupation"
              // onChange={handleChange}
              placeholder="Occupation:"/>
        </div>

        <div className="residence__info">
          <label className='label'>Residence</label>
          <br/>
          <input
              className="input__residence"
              type="text"
              name="residence"
              // onChange={handleChange}
              placeholder="Location:"/>
        </div>

        <div className='update__wrapper'>
          <div className="birthday__info">
            <label className='label'>Birthday</label>
            <br/>
            <input
                className="input__birthday"
                type="date"
                name="birthday"
                // onChange={handleChange}
                placeholder="Birth date"/>
          </div>

          <button className="update__submit">Update Profile</button>
        </div>

      </form>
    </div>
  )
}

export default ProfileInfo