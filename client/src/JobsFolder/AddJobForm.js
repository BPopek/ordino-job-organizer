import React, { useState, useContext, useEffect } from 'react';
import { JobContext } from '../JobProvider';

function AddJobForm(props) {
    const { addJob, editJob } = useContext(JobContext)
    const [ toggled, setToggled ] = useState(false)

    const [jobInfo, setJobInfo] = useState({
        title: '',
        company: '',
        url: '',
        location: '',
        details: '',
        notes: '',
        contact: '',
        category: '',
    })
    // const [ title, setTitle ] = useState('')
    // const [ username, setUsername ] = useState('')
    // const [ location, setLocation ] = useState('')
    // const [ details, setDetails ] = useState('')
    // const [ notes, setNotes ] = useState('')
    // const [ toggled, setToggled ] = useState(true)

    const { type, job } = props
    
    useEffect(() => {
        if(type === 'update'){
            setJobInfo(job)
        }
    }, [type, job])

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setJobInfo(prevJob => ({
            ...prevJob,
            [name]: value
        }))
    }

    const clearInputs = () => {
        setJobInfo({
            title: '',
            company: '',
            url: '',
            location: '',
            details: '',
            notes: '',
            contact: '',
            category: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (props.type === 'add'){
            // handleCustomCategory(e)
            addJob(jobInfo)
                .then(() => {
                    clearInputs();
                    props.toggle()
                })
                .catch(err => console.error(err.response.data.message))
        } else {
            // handleCustomCategory(e)
            editJob(props.job._id, jobInfo)
                .then(() => {
                    props.toggle()
                })
                .catch(err => console.error(err.response.data.message))
        }
        // props.toggle()
    }

    // const handleCustomCategory = (e) => {
    //     const { value } = e.target;
    //     setJobInfo(prevJob => {
    //         const checkCustomName = new Set([...prevJob.customCategory, ...prevJob.category, value])
    //         const newCustom = [...checkCustomName]
    //         return {
    //             ...prevJob,
    //             customCategory: newCustom
    //         }
    //     })
    //     console.log(jobInfo)
    // }

    const toggledCustom = (e) => {
        setToggled(prev => {
            return !prev
        })
    }

    return(
        <>
            <form className={props.type === 'add' ? 'jobSubmitForm' : 'jobEdit'}>
                <h4 className='formTitle'>{props.type === 'add' ? 'Enter Job Info' : 'Edit Job Info'}</h4>
                <input 
                    name='title'
                    value={jobInfo.title}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job Title' />
                    <input 
                    name='company'
                    value={jobInfo.company}
                    onChange={handleChange}
                    type='text'
                    placeholder='Company Name' />
                <input 
                    name='url'
                    value={jobInfo.url}
                    onChange={handleChange}
                    type='url'
                    placeholder='Web Link' 
                    className='inputUrl'/>
                <input 
                    name='location'
                    value={jobInfo.location}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job Location' />
                <textarea 
                    name='details'
                    value={jobInfo.details}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job Details' 
                    className='jobInputLarge'/>
                <textarea 
                    name='notes'
                    value={jobInfo.notes}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job Notes' 
                    className='jobInputLarge'/>
                <input 
                    name='contact'
                    className='inputContact'
                    value={jobInfo.contact}
                    onChange={handleChange}
                    type='text'
                    placeholder='Job Contact' />

                { toggled ? 
                    <input 
                        name='category'
                        className='inputCustomCategory'
                        value={jobInfo.category}
                        // defaultValue='Enter Custom Category' 
                        onChange={handleChange}
                        type='text'
                        placeholder='Custom Category' />
                    : 
                    <> </>
                }
                {/* <select name='dropdownCategory' className='jobCategoryForm'>
                    <option value="job category">Job Category</option>
                    <option value="new">New</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="follow-up">Follow Up</option>
                    <option value="offer">Offer</option>
                    <option value="declined">Declined</option>
                </select> */}
                <div className='buttonTypes'>
                    <button className='jobTypeButton' type="button" name='category' value='NEW' onClick={handleChange}>NEW</button>
                    <button className='jobTypeButton' type="button" name='category' value='APPLIED' onClick={handleChange}>APPLIED</button>
                    <button className='jobTypeButton' type="button" name='category' value='INTERVIEW' onClick={handleChange}>INTERVIEW</button>
                    <button className='jobTypeButton' type="button" name='category' value='FOLLOW-UP' onClick={handleChange}>FOLLOW UP</button>
                    <button className='jobTypeButton' type="button" name='category' value='OFFER' onClick={handleChange}>OFFER</button>
                    <button className='jobTypeButton' type="button" name='category' value='FILED' onClick={handleChange}>FILED</button>
                    <button className='jobTypeButton' type="button" name='customCategory' value={jobInfo.customCategory} onClick={(e) => {
                        toggledCustom(e)
                    }}>ADD NEW CATEGORY</button>

                </div>
                <button onClick={handleSubmit} className='colorButton--save'>{props.button}</button>
            </form>
        </>
    )
}

export default AddJobForm