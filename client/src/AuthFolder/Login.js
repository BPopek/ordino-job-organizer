import React, { useState, useContext } from 'react';
import { JobContext } from '../JobProvider';
import ordinoG from '../Images/ordino-green.png';
import { Link } from 'react-router-dom';

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
                <h3 className='intro'>Job Application Organizer</h3>
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
                    
                <button type='submit' className='colorButton'>Log In</button>
                <h3 className='signUpIntro'>New User?</h3>
                <Link to='/signup' className='signUpLink'>Create Account Here</Link>
                <h3 className='loginPortfolio'>TEST ACCOUNT LOGIN INFORMATION <br />IS AVAILABLE ON MY PORTFOLIO</h3>

            </form>
            {
                (errorMessage) && 
                <p className='errorMessage'>{errorMessage}</p>
            }
        </div>
    )
}

export default LoginForm;