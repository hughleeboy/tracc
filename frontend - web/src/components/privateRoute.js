import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const SignedIn = useSelector(state => state.user.signedIn)

    console.log(SignedIn)
    
    return <Route {...rest} render={(props) => (
      SignedIn ? <Component {...props} /> : <Redirect to='/login' />
    )} />
}

export default PrivateRoute