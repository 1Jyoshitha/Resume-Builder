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
    const [skills, setSkills] = useState([
        { header: "Technical Skills", subSkills: ["JavaScript", "ReactJS"] },
    ]);    
    const [experiences, setExperiences] = useState([
        { company: '', role: '', place: '', duration: '', points: ['', '', ''] },
    ]);
    const [education, setEducation] = useState([{
        university: '', place: '', degree: '', startYear: '', endYear: ''
    }]);
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
        setExperiences([...experiences, { company: '', role: '', place: '', duration: '', points: ['', '', ''] }]);
    };

    // Function to handle change in any of the experience fields
    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    // Function to handle point-wise info change
    const handlePointChange = (index, pointIndex, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index].points[pointIndex] = value;
        setExperiences(updatedExperiences);
    };

    const handleAddSkill = () => {
        setSkills([...skills, ""]);
    };
    
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };
    
    const handleAddSkillHeader = () => {
        setSkills([...skills, { header: "", subSkills: [""] }]);
    };
    
    const handleSkillHeaderChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index].header = value;
        setSkills(updatedSkills);
    };
    
    const handleAddSubSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills[index].subSkills.push("");
        setSkills(updatedSkills);
    };
    
    const handleSubSkillChange = (skillIndex, subIndex, value) => {
        const updatedSkills = [...skills];
        updatedSkills[skillIndex].subSkills[subIndex] = value;
        setSkills(updatedSkills);
    };
    
    const handleRemoveSubSkill = (skillIndex, subIndex) => {
        const updatedSkills = [...skills];
        updatedSkills[skillIndex].subSkills = updatedSkills[skillIndex].subSkills.filter(
            (_, i) => i !== subIndex
        );
        setSkills(updatedSkills);
    };
    
    const handleRemoveSkillHeader = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };
    
    

    // Function to add new education input

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        updatedEducation[index][field] = value;
        setEducation(updatedEducation);
    };
    
    // Function to add a new education entry
    const handleAddEducation = () => {
        setEducation([...education, { university: '', place: '', degree: '', startYear: '', endYear: '' }]);
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
    // const downloadResume = () => {
    //     const resumeElement = document.querySelector('.resume-template');
    //     html2canvas(resumeElement).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');

    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const width = pdf.internal.pageSize.getWidth();
    //         const height = canvas.height * (width / canvas.width);


    //         pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    //         // Download the PDF
    //         pdf.save('resume.pdf');
    //         });
    //         toast.success("Resume Successfully  Downloaded")
            
    // };

    const downloadResume = () => {
        const resumeElement = document.querySelector('.resume-template');
        
        // Wait for images to load
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                }
            });
        });
    
        // Wait for all images to load before continuing
        Promise.all(imagePromises).then(() => {
            html2canvas(resumeElement, { 
                scrollX: 0, 
                scrollY: -window.scrollY, 
                useCORS: true, 
                allowTaint: true,
                logging: true,
                scale: 2 
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = canvas.height * (width / canvas.width);
    
                // Add the first page
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    
                // If content exceeds the A4 page, add more pages
                if (height > 297) { // A4 height is 297mm
                    const pageCount = Math.ceil(height / 297);
                    for (let i = 1; i < pageCount; i++) {
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, -297 * i, width, height);
                    }
                }
    
                // Save the PDF
                pdf.save('resume.pdf');
                toast.success("Resume Successfully Downloaded");
            });
        });
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
                                {skills.map((skill, index) => (
                                    <div key={index} style={{ marginBottom: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="text"
                                                placeholder="Enter Skill Header"
                                                value={skill.header}
                                                onChange={(e) => handleSkillHeaderChange(index, e.target.value)}
                                                style={{ marginRight: "10px", fontWeight: "bold" }}
                                            />
                                            <button onClick={() => handleRemoveSkillHeader(index)}>Remove</button>
                                        </div>
                                        {skill.subSkills.map((subSkill, subIndex) => (
                                            <div key={subIndex} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Sub-Skill"
                                                    value={subSkill}
                                                    onChange={(e) =>
                                                        handleSubSkillChange(index, subIndex, e.target.value)
                                                    }
                                                    style={{ marginRight: "10px" }}
                                                />
                                                <button onClick={() => handleRemoveSubSkill(index, subIndex)}>Remove</button>
                                            </div>
                                        ))}
                                        <button onClick={() => handleAddSubSkill(index)}>Add Sub-Skill</button>
                                    </div>
                                ))}
                                <button onClick={handleAddSkillHeader}>Add Skill Header</button>
                            </div>
                        </details>
                        <details>
                        <summary>Experience</summary>
                        <div className='resume-input' ref={expRef}>
                            {experiences.map((exp, index) => (
                                <div key={index} className="experience-entry">
                                    {/* Company Name */}
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={exp.company}
                                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                    />
                                    
                                    {/* Role */}
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={exp.role}
                                        onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                                    />
                                    
                                    {/* Place */}
                                    <input
                                        type="text"
                                        placeholder="Place"
                                        value={exp.place}
                                        onChange={(e) => handleExperienceChange(index, 'place', e.target.value)}
                                    />
                                    
                                    {/* Duration */}
                                    <input
                                        type="text"
                                        placeholder="Duration"
                                        value={exp.duration}
                                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                                    />
                                    
                                    {/* Point-wise Info */}
                                    <div className="points-section">
                                        <h4>Point-wise Info</h4>
                                        {exp.points.map((point, pointIndex) => (
                                            <textarea
                                                key={pointIndex}
                                                placeholder={`Point ${pointIndex + 1}`}
                                                value={point}
                                                onChange={(e) => handlePointChange(index, pointIndex, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddExp}>Add</button>
                        </div>
                    </details>

                    <details>
                    <summary>Education</summary>
                    <div className="resume-input" ref={eduRef}>
                        {education.map((edu, index) => (
                            <div key={index} className="education-entry">
                                <input
                                    type="text"
                                    placeholder="University Name"
                                    value={edu.university}
                                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Place"
                                    value={edu.place}
                                    onChange={(e) => handleEducationChange(index, 'place', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Start Year"
                                    value={edu.startYear}
                                    onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="End Year"
                                    value={edu.endYear}
                                    onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                                />
                            </div>
                        ))}
                        <button onClick={handleAddEducation}>Add Education</button>
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
                                <hr className="divider" />
                                <p style={{ fontSize: selectedFontSize }}>{summary}</p>
                            </div>

                            <div className='resume-skills'>
                            <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>
                                Skills
                            </h3>
                            <hr className="divider" />
                            {skills.map((skill, index) => (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    <p style={{ fontWeight: "bold", fontSize: selectedFontSize, marginBottom: "5px" }}>
                                        {skill.header}
                                    </p>
                                    <ul className="sub-skills" style={{ fontSize: selectedFontSize }}>
                                        {skill.subSkills.map((subSkill, subIndex) => (
                                            <li key={subIndex}>{subSkill}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>





                                                <div className='resume-exp'>
                            <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>
                                Experience
                            </h3>
                            <hr className="divider" />
                            {experiences.map((exp, index) => (
                                <div key={index} style={{ fontSize: selectedFontSize }}>
                                    {/* Company and Place on same line */}
                                    <div className="company-place">
                                        <p>{exp.company}</p>
                                        <p>{exp.place}</p>
                                    </div>

                                    {/* Role and Duration on same line */}
                                    <div className="role-duration">
                                        <p><strong>{exp.role}</strong> </p>
                                        <p> {exp.duration}</p>
                                    </div>

                                    {/* Point-wise Info with bullets */}
                                    <div className="point-wise">
                                        {exp.points.map((point, pointIndex) => (
                                            <p key={pointIndex}>• {point}</p>
                                        ))}
                                    </div>

                                    <hr />
                                </div>
                            ))}
                        </div>

                    

                        <div className='resume-edu'>
    <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>
        Education
    </h3>
    <hr className="divider" />
    {education.map((edu, index) => (
        <div key={index} style={{ fontSize: selectedFontSize }}>
            {/* University and Place on same line */}
            <div className="university-place">
                <p><strong>{edu.university}</strong> </p>
                <p>{edu.place} </p>
            </div>

            {/* Degree and Years on same line */}
            <div className="degree-years">
                <p>{edu.degree} </p>
                <p>{edu.startYear} - {edu.endYear} </p>
            </div>

            <hr />
        </div>
    ))}
</div>


                            <div className='resume-cert'>
                                <h3 style={{ color: selectedColor, fontFamily: selectedFontFamily, fontSize: selectedFontSize }}>Courses And Certification</h3>
                                <hr className="divider" />
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


