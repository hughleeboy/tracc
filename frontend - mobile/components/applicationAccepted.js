import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
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
    </Card>
} 

export default Application