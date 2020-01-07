import React, { useContext, useState } from 'react';
import Job from './Job';
import AddJobForm from './AddJobForm';
import { JobContext } from '../JobProvider';

function JobList() {
    const { addJob, jobs } = useContext(JobContext)

    const [ toggled, setToggled ] = useState(true)

    const toggle = () => {
        setToggled(prev => {
            console.log(prev)
            return !prev
        })
    }
    const jobsObj = jobs.reduce((fin, cur) => {
        if(fin[cur.category]){
          fin[cur.category].push(cur)
        } else {
          fin[cur.category] = []
          fin[cur.category].push(cur)
        }
        return fin
      }, {})
      let categories = []
      for(let key in jobsObj){
        const current = []
        current.push(<h1 className='categoryTitle'>{key}</h1>)
        for(let i = 0; i < jobsObj[key].length; i++){
          current.push(<Job {...jobsObj[key][i]}/>)
        }
        categories.push(current)
      }
      const finalCats = categories.map(cat => {
          // console.log(cat[0].props.children)
        return (
          <div className={cat[0].props.children} >
            {cat[0]}
            {cat.slice(1)}
          </div>
        )
      })
      // console.log(props.children)

      return (
          <>
            <div className='addNewDiv'>
                { toggled ?
                    <button className='addNewJob' onClick={toggle}>Add New Job</button>
                    :
                    <AddJobForm addjob={addJob} button='Submit' type='add' toggle={toggle}/>
                }
            </div>
            <div className='container'>
                    {finalCats}
            </div>
        </>
      )
    }

export default JobList;