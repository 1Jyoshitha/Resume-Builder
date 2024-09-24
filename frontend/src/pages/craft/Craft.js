import React, { useRef, useState } from 'react';
import './Craft.css';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-hot-toast';
import { SketchPicker } from 'react-color';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 



const Craft = () => {
    const [personalDetails, setPersonalDetails] = useState({ name: '', role: '', contactNumber: '', email: '', linkedIn: '' });
    const [summary, setSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [experiences, setExperiences] = useState([""]);
    const [education, setEducation] = useState([""]);
    const [certifications, setCertifications] = useState([""]);
    const [template, setTemplate] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
    const [selectedFontSize, setSelectedFontSize] = useState('16px');

    // Refs for dynamically adding inputs
    const expRef = useRef(null);
    const eduRef = useRef(null);
    const cetRef = useRef(null);

    // Function to handle template selection
    const handleTemplateSelect = (template) => {
        if (template === 'temp1') {
            setTemplate('professional');
            toast('Professional Template Applied', {
                style: { background: '#2196f3', color: '#fff' },
                icon: 'ℹ️',
                duration: 2000,
                position: 'top-center'
            });
        } else if (template === 'temp2') {
            setTemplate('modern');
            toast('Modern Template Applied', {
                style: { background: '#2196f3', color: '#fff' },
                icon: 'ℹ️',
                duration: 2000,
                position: 'top-center',
            });
        }
    };

    // Function to add new work experience input
    const handleAddExp = () => {
        setExperiences([...experiences, '']);
        if (expRef.current) {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Your Work Experience';
            newInput.oninput = (e) => { handleExperienceChange(experiences.length, e.target.value); }
            expRef.current.appendChild(newInput);
        }
    };

    // Function to handle change in work experience input
    const handleExperienceChange = (index, value) => {
        const newExperiences = [...experiences];
        newExperiences[index] = value;
        setExperiences(newExperiences);
    };

    // Function to add new education input
    const handleAddEducation = () => {
        setEducation([...education, '']);
        if (eduRef.current) {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Your Education';
            newInput.oninput = (e) => { handleEducationChange(education.length, e.target.value); }
            eduRef.current.appendChild(newInput);
        }
    };

    // Function to handle change in education input
    const handleEducationChange = (index, value) => {
        const newEducation = [...education];
        newEducation[index] = value;
        setEducation(newEducation);
    };

    // Function to add new certification input
    const handleAddCertification = () => {
        setCertifications([...certifications, '']);
        if (cetRef.current) {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Your Certification';
            newInput.oninput = (e) => { handleCertificationChange(certifications.length, e.target.value); }
            cetRef.current.appendChild(newInput);
        }
    };

    // Function to handle change in certification input
    const handleCertificationChange = (index, value) => {
        const newCertifications = [...certifications];
        newCertifications[index] = value;
        setCertifications(newCertifications);
    };

    // Function to handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Function to handle color change
    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    // Function to handle font family change
    const handleFontFamilyChange = (e) => {
        setSelectedFontFamily(e.target.value);
    };

    // Function to handle font size change
    const handleFontSizeChange = (e) => {
        setSelectedFontSize(e.target.value);
    };

    // Function to download resume as PDF
    const downloadResume = () => {
        const resumeElement = document.querySelector('.resume-template');
        html2canvas(resumeElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = canvas.height * (width / canvas.width);


            pdf.addImage(imgData, 'PNG', 0, 0, width, height);

            // Download the PDF
            pdf.save('resume.pdf');
            });
            toast.success("Resume Successfully  Downloaded")
            
    };
        

    
    

    return (
        <Layout>
            <div className='craft'>
                <div className='templates'>
                    <div className='temp1' onClick={() => handleTemplateSelect('temp1')}>
                        <img src='https://cdn.enhancv.com/ivy_league_cover_letter_template_1_439b5cab58.png' alt='Professional Template' />
                        <h5>Professional</h5>
                    </div>
                    <div className='temp2' onClick={() => handleTemplateSelect('temp2')}>
                        <img src='https://marketplace.canva.com/EAFHgezdf9U/1/0/1131w/canva-warm-neutrals-modern-simple-resume-bYAYPuv6GfI.jpg' alt='Modern Template' />
                        <h5>Modern</h5>
                    </div>
                </div>
                <div className='resume-option'>
                    <div className='color-picker'>
                        <button onClick={() => setShowColorPicker(!showColorPicker)}>Pick Color</button>
                        {showColorPicker && <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />}
                    </div>
                    <div className='font-picker'>
                        <label htmlFor='font-family'>Select Font Family: </label>
                        <select id='font-family' value={selectedFontFamily} onChange={handleFontFamilyChange}>
                            <option value='Arial'>Arial</option>
                            <option value='Courier New'>Courier New</option>
                            <option value='Georgia'>Georgia</option>
                            <option value='Times New Roman'>Times New Roman</option>
                            <option value='Verdana'>Verdana</option>
                        </select>
                    </div>
                    <div className='font-size-picker'>
                        <label htmlFor='font-size'>Select Font Size: </label>
                        <select id='font-size' value={selectedFontSize} onChange={handleFontSizeChange}>
                            <option value='12px'>12px</option>
                            <option value='14px'>14px</option>
                            <option value='16px'>16px</option>
                            <option value='18px'>18px</option>
                            <option value='20px'>20px</option>
                        </select>
                    </div>
                </div>
                <div className='craft-box'>
                    <div className='craft-form'>
                        <h1>Craft Your Resume</h1>
                        <details className={template === "professional" ? "professional" : "modern"}>
                            <summary>Personal Details</summary>
                            <div className='resume-input'>
                                {template === "modern" && <input type='file' onChange={handleImageChange} />}
                                <input type='text' placeholder='Enter Your Name' value={personalDetails.name} onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })} />
                                <input type='text' placeholder='Enter Your Role' value={personalDetails.role} onChange={(e) => setPersonalDetails({ ...personalDetails, role: e.target.value })} />
                                <input type='text' placeholder='Enter Your Contact Number' value={personalDetails.contactNumber} onChange={(e) => setPersonalDetails({ ...personalDetails, contactNumber: e.target.value })} />
                                <input type='text' placeholder='Enter Your Email' value={personalDetails.email} onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })} />
                                <input type='text' placeholder='Enter Your LinkedIn Link' value={personalDetails.linkedIn} onChange={(e) => setPersonalDetails({ ...personalDetails, linkedIn: e.target.value })} />
                            </div>
                        </details>
                        <details>
                            <summary>Summary</summary>
                            <div className='resume-input'>
                                <textarea placeholder='Enter About Yourself' value={summary} onChange={(e) => setSummary(e.target.value)} />
                            </div>
                        </details>
                        <details>
                            <summary>Skills</summary>
                            <div className='resume-input'>
                                <input type='text' placeholder='Enter Your Skills' value={skills} onChange={(e) => setSkills(e.target.value)} />
                            </div>
                        </details>
                        <details>
                            <summary>Experience</summary>
                            <div className='resume-input' ref={expRef}>
                                {experiences.map((exp, index) => (
                                    <input
                                        key={index}
                                        type='text'
                                        placeholder='Enter Your Work Experience'
                                        value={exp}
                                        onChange={(e) => handleExperienceChange(index, e.target.value)}
                                    />
                                ))}
                                <button onClick={handleAddExp}>Add</button>
                            </div>
                        </details>
                        <details>
                            <summary>Education</summary>
                            <div className='resume-input' ref={eduRef}>
                                {education.map((edu, index) => (
                                    <input key={index} type='text' placeholder='Enter Your Education' value={edu} onChange={(e) => handleEducationChange(index, e.target.value)} />
                                ))}
                                <button onClick={handleAddEducation}>Add</button>
                            </div>
                        </details>
                        <details>
                            <summary>Courses And Certification</summary>
                            <div className='resume-input' ref={cetRef}>
                                {certifications.map((cert, index) => (
                                    <input key={index} type='text' placeholder='Enter Your Certification' value={cert} onChange={(e) => handleCertificationChange(index, e.target.value)} />
                                ))}
                                <button onClick={handleAddCertification}>Add</button>
                            </div>
                        </details>
                    </div>
                    <div className='resume-live'>
                        <h1>Live Preview</h1>
                        <div className={`resume-template ${template}`}>
                            <div className='resume-personal' style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>
                                {template === "modern" && imageURL && (
                                    <div className='resume-image'>
                                        <img src={imageURL} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </div>
                                )}
                                <p id='name'>{personalDetails.name}</p>
                                <p id='role'>{personalDetails.role}</p>
                                <ul>
                                    <li id='number'>{personalDetails.contactNumber}</li>
                                    <li id='email'>{personalDetails.email}</li>
                                    <li id='linkedin'>{personalDetails.linkedIn}</li>
                                </ul>
                            </div>
                            <div className='resume-summary'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize,}}>Summary</h3>
                                <p style={{ fontSize: selectedFontSize }}>{summary}</p>
                            </div>
                            <div className='resume-skills'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>Skills</h3>
                                <p style={{ fontSize: selectedFontSize }}>{skills}</p>
                            </div>
                            <div className='resume-exp'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>Experience</h3>
                                {experiences.map((exp, index) => (
                                    <p key={index} style={{ fontSize: selectedFontSize }}>{exp}</p>
                                ))}
                            </div>
                            <div className='resume-edu'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>Education</h3>
                                {education.map((edu, index) => (
                                    <p key={index} style={{ fontSize: selectedFontSize }}>{edu}</p>
                                ))}
                            </div>
                            <div className='resume-cert'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>Courses And Certification</h3>
                                {certifications.map((cert, index) => (
                                    <p key={index} style={{ fontSize: selectedFontSize }}>{cert}</p>
                                ))}
                            </div>
                        </div>
                        <button onClick={downloadResume} id='download-btn'>Download Resume as PDF</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Craft;
