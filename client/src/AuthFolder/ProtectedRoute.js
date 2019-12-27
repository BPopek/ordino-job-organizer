import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { JobContext } from '../JobProvider'

function ProtectedRoute(props) {
    const { token } = useContext(JobContext)
        // console.log(token)
    const { component: Component, ...rest } = props;

    return (
        token ?
        <Route {...rest} component={Component} />
        :
        <Redirect to='/login' />
    )
}

export default ProtectedRoute;