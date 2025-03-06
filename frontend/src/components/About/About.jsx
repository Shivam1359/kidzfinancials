import React from 'react'
import './About.css'
import about_img from '../../assets/contact-img1.jpg'

const About = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <img src={about_img} alt='' className='about-img'/>
            <img src='' alt='' className='play-icon'/>
        </div>
        <div className='about-right'>
            <h3>About Kidfinancials</h3>
            <h2>Secure Your future</h2>
            <p>fbhbfdjv jc vhjbvjkbvffvkjnvffffvfvghhngh,gblkmbkfdlvfdfmkfgh</p>
            <p>kgjnbdsmvcjnfvnljkfdhbvklm d hfyvib y ibvuoih yoj brvoxvhe  iu</p>
        </div>
    </div>
  )
}

export default About