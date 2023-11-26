import React, { useContext, useEffect, useState } from 'react'
import './UserProfile.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ProfileInfo from '../../Components/Profile/ProfileInfo/ProfileInfo';
import ProfilePic from '../../Components/Profile/ProfilePic/ProfilePic';
import Security from '../../Components/Profile/Security/Security';
import AccountSetting from '../../Components/Profile/AccountSetting/AccountSetting';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';



function UserProfile() {

  const [ userData, setUserData ] = useContext(UserContext);
  const [ userProfile, setUserProfile ] = useState({});


  useEffect(() => {
    const fetchProfileInfo = async () => {
      await axios.get(`http://localhost:4000/api/users/profileInfo?userId=${userData?.user?.id}`)
      .then((res) => setUserProfile(res.data))
      .catch((err) => console.log(err));
    }
    fetchProfileInfo();
  }, [userData]);
  // console.log(userProfile.data);

  // console.log(profInfo);

  let props = {};
  const [component, setComponent] = useState(null);
  const [bgColor, setBgColor] = useState('profileInfo');

  useEffect(() => {
    if (userProfile.data) {
      props = {
        userId: userProfile.data?.user_id,
        fName: userProfile.data?.first_name,
        lName: userProfile.data?.last_name,
        bio: userProfile.data?.bio,
        url: userProfile.data?.url,
        occupation: userProfile.data?.occupation,
        location: userProfile.data?.location,
        birthDay: userProfile.data?.birth_date,
      };

      setComponent(<ProfileInfo {...props} />);
    }
  }, [userProfile]);

  const handleProfileInfo = () => {
    setComponent(() => <ProfileInfo {...props}/>);
    setBgColor(() => 'profileInfo');
  }

  const handleProfilePic = () => {
    setComponent(() => <ProfilePic />);
    setBgColor(() => 'profilePic');
  }

  const handleAccSetting = () => {
    setComponent(() => <AccountSetting/>);
    setBgColor(() => 'accSetting');
  }

  const handleSecurity = () => {
    setComponent(() => <Security/>);
    setBgColor(() => 'security');
  }


  return (
    <div className="UserProfile">

      <nav className="nav__container">
        <ul className="nav__wrapper">

          <li className={`nav ${bgColor==='profileInfo' ? 'bgColor' : ''}`} onClick={handleProfileInfo}><PersonOutlineOutlinedIcon
          fontSize='large' className='icon'/>Profile Information</li>
          
          <li className={`nav ${bgColor==='profilePic' ? 'bgColor' : ''}`} onClick={handleProfilePic}><AccountCircleOutlinedIcon  fontSize='large' className='icon'/> Profile Picture</li>

          <li className={`nav ${bgColor==='accSetting' ? 'bgColor' : ''}`} onClick={handleAccSetting}><SettingsOutlinedIcon fontSize='large' className='icon'/> Account Setting</li>

          <li className={`nav ${bgColor==='security' ? 'bgColor' : ''}`} onClick={handleSecurity}><ShieldOutlinedIcon fontSize='large' className='icon'/> Security</li>

        </ul>
      </nav>

      {component}

    </div>
  )
}

export default UserProfile