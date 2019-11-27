import React from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'

const Login = (props) => {
    
    const responseGoogle = (response) => {
        console.log(response)
    }

    const dispatch = useDispatch()

    const loginSuccess = () => {
        dispatch({type: "LOGIN"})
        props.history.push('/applications')
    }

    return <div>
        {/* <Button title="Login" onClick={()=> loginSuccess()}> Login </Button> */}
        <GoogleLogin
            clientId="CLIENTID"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    </div> 
}

export default Login