import React, { Component } from 'react';
import { withContext } from '../JobContext-old';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            username: '',
            password: '',
            errorMessage: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then(() => {
                this.props.history.push('/jobs')
            })
            .catch(err => {
                this.setState({ errorMessage: err.response.data.message })
            })
            this.clearInputs()
    }

    render(){
        return(
            <div className='formDiv'>
                <form onSubmit={this.handleSubmit}>
                    <h2 className='login'>Log In</h2>
                    <input
                        onChange={this.handleChange}
                        value={this.state.username}
                        name='username'
                        type='text'
                        placeholder='username' />
                    <input 
                        onChange={this.handleChange}
                        value={this.state.password}
                        name='password'
                        type='text'
                        placeholder='password' />
                    <button type='submit'>Submit</button>
                </form>
                {
                    this.state.errorMessage && 
                    <p className='errorMessage'>{this.state.errorMessage}</p>
                }
            </div>
        )
    }
}

export default withContext(LoginForm);