import React, { useContext, useEffect, useState } from 'react';
import Job from './Job';
import AddJobForm from './AddJobForm';
import { JobContext } from '../JobProvider';

function JobListold(props) {
    const { addJob, jobs, editJob, deleteJob, getJobs } = useContext(JobContext)

    const [ toggled, setToggled ] = useState(true)

    useEffect(() => {
        getJobs()
    }, [])

    const toggle = () => {
        setToggled(prev => {
            console.log(prev)
            return !prev
        })
    }

                /* key={job._id} */
    // const mappedJobs = jobs.map(job => 
    //         <Job
    //         job={job}
    //         editJob={editJob}
    //         deleteJob={deleteJob}
    //         className={
    //             job.category === 'NEW' ? 'newJob' : 
    //             job.category === 'APPLIED' ? 'appliedJob' : 
    //             job.category === 'INTERVIEW' ? 'interviewJob' : 
    //             job.category === 'FOLLOW UP' ? 'followUpJob' :
    //             job.category === 'OFFER' ? 'offerJob' :
    //             'filedJob' }
    //         />
    //     )
    const mappedNew = jobs.filter(job => job.category === 'NEW').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedApplied = jobs.filter(job => job.category === 'APPLIED').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedInterview = jobs.filter(job => job.category === 'INTERVIEW').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedFollowUp = jobs.filter(job => job.category === 'FOLLOW UP').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedOffer = jobs.filter(job => job.category === 'OFFER').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedFiled = jobs.filter(job => job.category === 'FILED').map((job => 
        <Job
        job={job}
        editJob={editJob}
        deleteJob={deleteJob}
        />
    ))
    const mappedCustom = jobs.filter(job => job.category !== 'NEW' &&  job.category !== 'APPLIED' && job.category !== 'INTERVIEW' && job.category !== 'FOLLOW UP' && job.category !== 'OFFER' && job.category !== 'FILED').map((job => 
        <>
        <h1 className='categoryTitle'>{job.category}</h1>
            <Job
            job={job}
            editJob={editJob}
            deleteJob={deleteJob}
            />
        </>
    ))
    
    console.log(mappedCustom)
    // console.log(mappedInterview)
    // console.log(mappedApplied)

    return(
        <>
            <div className='addNewDiv'>
                { toggled ?
                    <button className='addNewJob' onClick={toggle}>Add New Job</button>
                    :
                    <AddJobForm addjob={addJob} button='Submit' type='add' toggle={toggle}/>
                }
            </div>
            <div className='container'>  
                <div className="newJob">
                    <h1 className='categoryTitle'>New Job</h1>
                    {mappedNew}
                </div>
                <div className="appliedJob">
                    <h1 className='categoryTitle'>Applied</h1>
                    {mappedApplied}
                </div>
                <div className="interviewJob">
                    <h1 className='categoryTitle'>Interview</h1>
                    {mappedInterview}
                </div>
                <div className="followUpJob">
                    <h1 className='categoryTitle'>Follow-Up</h1>
                    {mappedFollowUp}
                </div>
                <div className="offerJob">
                    <h1 className='categoryTitle'>Offer</h1>
                    {mappedOffer}
                </div>
                <div className="filedJob">
                    <h1 className='categoryTitle'>Filed</h1>
                    {mappedFiled}
                </div>

                <div className={mappedCustom.category}>
                    {/* <h1 className='categoryTitle'>{props.job.category}</h1> */}
                    {mappedCustom}
                </div>
                {/* {mappedJobs} */}
            </div>
        </>
    )
}

export default JobListold;