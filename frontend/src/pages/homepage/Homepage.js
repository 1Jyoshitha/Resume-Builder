import React from 'react'
import './Homepage.css'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
const Homepage = () => {
  return (
    <Layout>
    <div className='homepage'>
      <div className="homepage-container">
        <div className="homepage-title">
          <h1>Resume Craft</h1>
          <h3>Not Just Build, Craft Your Resume</h3>
          <div className='homepage-image'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFeEncB-qSltjWvjRicWvwkCdPHwnTDLKNPg&s" />

        </div>
        </div>
        <div className="homepage-about">
          <h1>The Best Online Resume Builder</h1>
          <p>Craft Your Perfect Resume For Any Job Using Our Best-In-Class Resume Builder Platform</p>
          <Link to="/craft">Craft  🛠 Your Resume Now </Link>
        </div>
        </div>
        <div className='homepage-faq'>
          <h1>Frequently Asked Questions About Resume Craft ?</h1>
          <details>
            <summary>What makes Resume Craft best resume tool</summary>
            <p>Using the Resume Builder app, you have a 30% higher chance of getting a job, and our users experience a 42% higher response rate from recruiters. You'll get expert guidance every step of the way, with more than 30 professional resume templates and AI-enabled suggestions to write a resume that gets results.</p>
          </details>
          <details>
            <summary>How do I use the Resume Builder app?</summary>
            <p>With Resume Builder, you’ll select and customize a template, then create your resume either with step-by-step guidance or by importing your LinkedIn profile. You’ll add your experience, education, key skills, and more, aided by expert tips, suggested phrases, and an AI writer tool. Then, save your resume by creating a free account. You can download your TXT resume or upgrade to a paid subscription to download your professionally designed PDF resume.</p>
          </details>
          <details>
            <summary>Should I download my new resume as a PDF or text file?</summary>
            <p>We recommend downloading your resume in both PDF and text format. A professionally designed PDF resume has a visual impact, and its appearance is consistent across computer screens and systems. But you may need a text format resume</p>
          </details>
          <details>
            <summary>Does Resume Builder have resume examples that I can look at?</summary>
            <p>Yes. Resume Builder has more than 500 free resume examples and templates. Use these examples to get expert advice on what you should - and shouldn't - include in your resume, such as common key skills and action verbs for your desired job.</p>
          </details>
        </div>
        <div className='homepage-steps'>
          <h1>Easy Steps For Crafting Your Resume</h1>
          <h3>Step 1 - <span>Choose Your Fav Resume Template</span></h3>
          <h3>Step 2 - <span>Add Your Details To Resume</span></h3>
          <h3>Step 3 - <span>Hit The Download Button</span></h3>
          <h3>Step 4 - <span>Congratulations</span></h3>
        </div>
        <div className='homepage-company'>
        <h1>Our Users Got Hired In These Companies</h1>
        <h2><Typewriter
        options={{
          strings: ["Google", "Facebook", "Amazon", "JP Morgan", "Microsoft", "TCS"],
          autoStart: true,
          loop: true,
        }}
      /></h2>
       
        </div>
    <div>
      
    </div>
    </div>
        
    </Layout>
  )
}

export default Homepage