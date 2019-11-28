import React from 'react'
import { Text, ToastAndroid } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'


const Application = (props) => {

    const dispatch = useDispatch()
    console.log(props)
    return <Card>
        <Text>
            {props.info.Name}
        </Text>
        <Text>
            {props.info.Position}
        </Text>
        <Text>
            {props.info.AppDate}
        </Text>
        <Button 
            onPress={()=>{
                dispatch({type: 'APPLICATION_APPLIED', AppId: props.info.AppId })
                ToastAndroid.show('Applied!', ToastAndroid.SHORT)
            }} 
            title='Applied!' 
        />
    </Card>
} 

export default Application