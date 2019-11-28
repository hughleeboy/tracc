import React, { useState } from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import styles from '../style/styles'
import { url } from '../secrets'

const RegisterPage = (props) => {

    const status = useSelector(state => state.status)
    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const onSubmit = () => {
        if(FName === "" || LName === "" || Username === "" || Password === "") {
            ToastAndroid.show('Please fill in all information!', ToastAndroid.SHORT)  
        } else {
            const values = { FName, LName, Username, Password }
            fetch(url+'user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(values)
            }).then(response => response.json(values))
            .then(result => {
            console.log(result)
            })
        }
    }

    return <SafeAreaView>
        <ScrollView>
            <Text style={styles.auth_title}>
                Register
            </Text>
            <Input placeholder='Enter First Name' onChangeText={(fname) => setFName(fname)} />
            <Input placeholder='Enter Last Name' onChangeText={(lname) => setLName(lname)} />
            <Input placeholder='Enter Username' onChangeText={(username) => setUsername(username)} />
            <Input placeholder='Enter Password' onChangeText={(password) => setPassword(password)} />
            <Button title='Sign Up' onPress={()=>onSubmit()}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
                <Text>
                    Or Sign In!
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
}

export default RegisterPage