import React from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='Footer'>

      <div className='footer__media'>
        <Link to='/'>
          <img src='https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png' alt='evangadi logo'/>
        </Link>
        <div className='socialMedias'>
          <FacebookIcon/>
          <InstagramIcon/>
          <YouTubeIcon/>
        </div>
      </div>

      <div className='footer__links'>
        <h2>Useful Link</h2>
        <ul>
          <li><Link to='/'>How it works</Link></li>
          <li><Link to='/'>Terms of Service</Link></li>
          <li><Link to='/'>Privacy policy</Link></li>
        </ul>
      </div>

      <div className='footer__contact'>
        <h2>Contact Info</h2>
        <p>
          Evangadi Networks
          <br/>
          support@evangadi.com
          <br/>
          +1-202-386-2702
        </p>
      </div>

    </div>
  )
}

export default Footer