import React, { Component } from 'react';
import axios from 'axios';
const jobAxios = axios.create();

jobAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const jobContext = React.createContext();

export class JobContextProvider extends Component {
    constructor(){
        super()
        this.state = {
            jobs: [],
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || ''
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs = () => {
        return jobAxios.get('/api/job')
        .then(response => {
            this.setState({ jobs: response.data });
            return response;
        })
    }

    addJob = (newJob) => {
        return jobAxios.get('/api/job')
        .then(response => {
            this.setState(prevState => {
                return { jobs: [...prevState.jobs, response.data] }
            });
            return response;
        })
    }

    editJob = (jobId, job) => {
        return jobAxios.put(`/api/job/${jobId}`, job)
        .then(response => {
            this.setState(prevState => {
                const updatedJobs = prevState.jobs.map(job => {
                    return job._id === response.data._id ? response.data : job
                })
                return { jobs: updatedJobs }
            })
            return response;
        })
    }

    deleteJob = (jobId) => {
        return jobAxios.delete(`/api/job/${jobId}`)
        .then(response => {
            this.setState(prevState => {
                const updatedJobs = prevState.jobs.filter(job => {
                    return job._id !== jobId
                })
                return { jobs: updatedJobs }
            })
            return response;
        })
    }

    signup = (userInfo) => {
        return jobAxios.post('/auth/signup', userInfo)
        .then(response => {
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.setState({
                user, 
                token
            });
            return response;
        })
    }

    login = (credentials) => {
        return jobAxios.post('/auth/login', credentials)
        .then(response => {
            const { user, token } = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user));
            this.setState({
                user,
                token
            });
            this.getJobs();
            return response;
        })
    }

    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
            jobs: [],
            user: {},
            token: ''
        })
    }
    render() {
        return(
            <jobContext.Provider
                value={{
                    getJobs: this.getJobs,
                    addJobs: this.jobs,
                    editJobs: this.editJobs,
                    deleteJob: this.deleteJob,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    ...this.state
                }}
                >
                {this.props.children}
                </jobContext.Provider>
        )
    }
}

export const withContext = Component => {
    return props => {
        return (
            <jobContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </jobContext.Consumer>
        )
    }
}