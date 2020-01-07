import React, { useState } from 'react';
import axios from 'axios';

const jobAxios = axios.create()

jobAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const JobContext = React.createContext();

function JobProvider(props) {
    const [ jobs, setJobs ] = useState([])

    // const [ user, setUser ] = useState( JSON.parse(localStorage.getItem('user')) || {} )
    // const [ token, setToken ] = useState( localStorage.getItem('token') || '')
    
    const [ userState, setUserState ] = useState({
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || ''
    })

    const getJobs = () => {
        // console.log('hi')
        return jobAxios.get('/api/jobs')
        .then(response => {
            // console.log(response)
            setJobs(response.data);
            return response;
        })
    }

    const addJob = (newJob) => {
        return jobAxios.post('/api/jobs', newJob)
        .then(response => {
            getJobs()
            return response;
        })
    }

    const editJob = (jobId, job) => {
        return jobAxios.put(`/api/jobs/${jobId}`, job)
        .then(response => {
            // console.log(jobs)
            setJobs(prevJobs => {
                const updatedJobs = prevJobs.map(job => {
                    return job._id === response.data._id ? response.data : job
                })
                 setJobs(updatedJobs)
            })
            // console.log(response)
            return response;
        })
    }

    const deleteJob = (jobId) => {
        return jobAxios.delete(`/api/jobs/${jobId}`)
        .then(response => {
            setJobs(prevJobs => {
                const updatedJobs = prevJobs.filter(job => {
                    return job._id !== jobId
                })
                 return (updatedJobs)
            })
            return response;
        })
    }

    const signup = (userInfo) => {
        return jobAxios.post('/auth/signup', userInfo)
        .then(response => {
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserState(prevState => ({
                ...prevState, user, token
            }));
            return response;
        })
    }

    const login = (credentials) => {
        return jobAxios.post('/auth/login', credentials)
        .then(response => {
            const { user, token } = response.data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserState(prevState => ({
                ...prevState, user, token
            }));
            getJobs()
            return response;
        }) 
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setJobs([]);
        setUserState(prevState => ({
            user: {},
            token: ''
        }));
    }

    return (
        <JobContext.Provider 
            value={{
                jobs, ...userState,
                getJobs, addJob, editJob, deleteJob, signup, login, logout 
            }}>
            { props.children }
        </JobContext.Provider>
    )
}

export { JobContext, JobProvider }