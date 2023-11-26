import React, { useState } from 'react'
import './ProfileInfo.css';
import axios from 'axios';


function ProfileInfo({userId, fName, lName, bio, url, occupation, location, birthDay }) {


  const [form, setForm] = useState({});
  
  const handleChange = (e) => {
      setForm({ ...form, id: userId, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
      e.preventDefault();
      try {
          await axios.put('http://localhost:4000/api/users/profileUpdate', form);

      } catch (error) {
          console.log('problem ==>', error.response.data.msg);
      }
  }
  
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
                value={fName}
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
                value={lName}
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
              value={bio}
              onChange={handleChange}
              placeholder="Your Bio:"/>
        </div>

        <div className="url__info">
          <label className='label'>URL</label>
          <br/>
          <input
              className="input__url"
              type="text"
              name="url"
              value={url}
              onChange={handleChange}
              placeholder="Website URL:"/>
        </div> 

        <div className="occupation__info">
          <label className='label'>Occupation</label>
          <br/>
          <input
              className="input__occupation"
              type="text"
              name="occupation"
              value={occupation}
              onChange={handleChange}
              placeholder="Occupation:"/>
        </div>

        <div className="residence__info">
          <label className='label'>Residence</label>
          <br/>
          <input
              className="input__residence"
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
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
                value={birthDay}
                onChange={handleChange}
                placeholder="Birth date"/>
          </div>

          <button onClick={handleUpdate} className="update__submit">Update Profile</button>
        </div>

      </form>
    </div>
  )
}

export default ProfileInfo