import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { JobProvider } from './JobProvider'

ReactDOM.render(
    <JobProvider>
        <Router>
            <App />
        </Router>
    </JobProvider>,
document.getElementById('root')
);

