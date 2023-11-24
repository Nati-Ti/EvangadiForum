import React from 'react'
import './ProfilePic.css';
import 'font-awesome/css/font-awesome.min.css';


function ProfilePic() {
  return (
    <div className='ProfilePic'>
      
      <h3>PROFILE PICTURE </h3>

      <div className='pic__wrapper'>
        <input type='file' className='profPicture' />
      </div>
      <button className="updateProfile__submit">Update Profile Picture</button>
    </div>
  )
}

export default ProfilePic