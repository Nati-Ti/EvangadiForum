import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePic.css';
import 'font-awesome/css/font-awesome.min.css';
import { UserContext } from '../../../Context/UserContext';

function ProfilePic() {
  
  const [userData, setUserData] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [ error, setError ] = useState('');
  const [ successShow, setSuccessShow ] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, userId: userData.user.id, profilePicture: file });
    setSelectedFile(URL.createObjectURL(file)); // Generate temporary URL for the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('profilePicture', user.profilePicture);
  
      await axios.put('http://localhost:4000/api/uploads/profilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserData({
        ...userData,
        profileUpdate: true
      });

    } catch (error) {
      setError(() => error);
      console.log('problem ==>', error.response.data.msg);
    }
    setSuccessShow(true);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/uploads/userProfilePic?userId=${userData.user.id}`, {
          responseType: 'blob', // Ensure binary response
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchProfilePicture();
  }, [user]);

  // console.log(profPic);
  return (
    <div className='ProfilePic'>
      <h3>PROFILE PICTURE</h3>
      <div className='pic__wrapper'>
        <img src={selectedFile || profilePicture || `https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png`} />
        <label htmlFor="profilePicture" className="choosePicture">
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            className="profPicture"
            onChange={handleUpload}
          />
        </label>
      </div>
      {(!error && successShow) ?
        <div className='profPicUpdate__success'>
          <img src='https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png' alt='successIcon' />
          <p>Profile picture update successful!</p>
        </div>
        : null
      }
      <button className='updateProfile__submit' onClick={handleSubmit}>
        Update Profile Picture
      </button>
    </div>
  );
}

export default ProfilePic;