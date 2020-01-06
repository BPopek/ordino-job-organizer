import React, { useContext, useState } from 'react';
import AddJobForm from './AddJobForm'

import { JobContext } from '../JobProvider';

function Job(props) {
    const { editJob, deleteJob } = useContext(JobContext)
    const [ toggled, setToggled ] = useState(true)
    const [ toggledData, setToggledData ] = useState(true)

    const toggle = () => {
        setToggled(prev => {
            console.log(prev)
            return !prev
        })
    }
    const toggleData = () => {
        setToggledData(prev => {
            console.log(prev)
            return !prev
        })
    }

    return (
        <>
            { toggled ? 
                <div className='jobBox'>
                    { toggledData ? 
                        <div className='card'>
                            <div className='toggleParent'>
                                <button className='toggleIcon' onClick={() => toggleData()}> ⊶ </button>
                            </div>
                            <h3 className='jobTitle'>{props.title}</h3>
                            <p className='jobCompany'>{props.company}</p>
                            <a href={`${props.url}`} className='jobURL'>{!props.url ? null : 'Job Posting Link'}</a>
                            <h4 className='jobLocation'>{props.location}</h4>
                        </div>
                        :
                        <div className='card'>       
                            <div className='toggleParent'>
                                <button className='toggleIcon' onClick={() => toggleData()}> ⊷ </button>
                            </div>
                            <h3 className='jobTitle'>{props.title}</h3>
                            <a href={`${props.url}`} className='jobURL'>{!props.url ? null : 'Job Posting Link'}</a>
                            {   props.company ?
                                <>
                            <p className='jobCompany'>{props.company}</p>
                                </>
                                :
                                <></>
                            }
                            <h4 className='jobLocation'>{props.location}</h4>
                            {   props.details ?
                                <>
                            <h4 className='jobSubTitle'>Job Details</h4>
                            <p className='jobDetails'>{props.details}</p>
                                </>
                                :
                                <></>
                            }
                            {   props.notes ?
                                <>
                                    <h4 className='jobSubTitle'>Job Notes</h4>
                                    <p className='jobNotes'>{props.notes}</p>
                                </>
                                :
                                <></>
                            }
                            {   props.contact ?
                                <>
                                <h4 className='jobSubTitle'>Contact</h4>
                                <p className='jobContact'>{props.contact}</p>
                                </>
                                :
                                <></>
                            }
                        </div>
                    }
                    <button onClick={() => {
                        editJob(props._id)
                        toggle()
                        }} 
                        className='jobButton'>Edit Job</button>
                    <button onClick={() => deleteJob(props._id)} className='jobButton'>Delete Job</button>
                </div>
                :
                <AddJobForm button='Save Changes' type='update' job={props} toggle={toggle}/>
            }            
        </>
    )
}

export default Job;