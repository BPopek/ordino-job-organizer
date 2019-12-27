import React, { useState, useContext } from 'react';
import { JobContext } from '../JobProvider';
import ordinoG from '../Images/ordino-green.png';

function LoginForm(props)  {
    const { login } = useContext(JobContext)

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
       
    const handleChange = (e) => {
        const { name, value } = e.target
            if( name === 'username' ){
                setUsername(value)
            } else {
            setPassword(value)
        }
        console.log(value)
    }

    const clearInputs = () => {
        setUsername('')
        setPassword('')
        setErrorMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login({username, password})
            .then(() => {
            })
            .catch(err => {
                console.log(err)
                setErrorMessage(err.response.data.message)
            })
            clearInputs()
    }

    return(
        <div className='formDiv'>
            <form onSubmit={handleSubmit} className='formMain'>
                <img src={ordinoG} className='formLogo' alt='logo'/>
                <h2 className='formHeader'>Please Log In</h2>
                <input
                    onChange={handleChange}
                    value={username}
                    name='username'
                    type='text'
                    placeholder='Username' 
                    className='formInput'
                    />
                <input 
                    onChange={handleChange}
                    value={password}
                    name='password'
                    type='password'
                    placeholder='Password' 
                    className='formInput'
                    />
                <button type='submit' className='colorButton'>Submit</button>
            </form>
            {
                (errorMessage) && 
                <p className='errorMessage'>{errorMessage}</p>
            }
        </div>
    )
}

export default LoginForm;