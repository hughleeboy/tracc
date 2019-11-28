import React, { useState } from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import styles from '../style/styles'
import { url } from '../secrets'


const LoginPage = (props) => {

    const status = useSelector(state => state.status)
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const onSubmit = () => {
        if( Username === "" || Password === "") {
            ToastAndroid.show('Please fill in all information!', ToastAndroid.SHORT)  
        } else {
            const values = { Username, Password }
            const headers = {
                'Content-Type': 'application/json;charset=utf-8',
                Username: values.Username,
                Password: values.Password
            }
            fetch(url+'login', {
            headers: headers,
            }).then(response => response.json())
            .then(result => {
            if(result.status === 'good') {
                this.props.loggedIn(values)
            } else {
                notification.error({
                message: 'Login Error',
                description: 'Please try re-entering your username and password.'
                })
            }}
            )
        }
    }


    return <SafeAreaView>
        <ScrollView>
            <Text style={styles.auth_title}>
                Login
            </Text>
            <Input placeholder='Enter Username' onChangeText={(username) => setUsername(username)} />
            <Input placeholder='Enter Password' onChangeText={(password) => setPassword(password)} />
            <Button title='Sign In' onPress={()=>onSubmit()}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Register")}>
                <Text>
                    Or Sign Up!
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
}

export default LoginPage