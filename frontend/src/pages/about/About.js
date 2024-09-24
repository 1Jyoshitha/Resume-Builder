import React from 'react'
import Layout from '../../components/layout/Layout'
import './About.css'

const About = () => {
  return (
    <Layout>
      <div className='about-box'>
        <div className='about-img'>
          <img src='https://static.vecteezy.com/system/resources/previews/007/931/696/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg' />
        </div>
        <div className='about-info'>
          <h1>About Us</h1>
          <h6>

          Welcome to Resume Craft—where creating the perfect resume is easier than brewing your morning coffee! We’re a quirky bunch of career enthusiasts who believe resumes don’t have to be dull. Whether you're a job-hunting ninja or just starting out, we’ll help you craft a resume that not only stands out but shouts, ‘Hire me already!’ Let's get that dream job with a sprinkle of fun and a dash of professionalism!"
          </h6>

        </div>
      </div>
    </Layout>
  )
}

export default About