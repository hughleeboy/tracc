import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'


const Application = (props) => {

    const date = Date.parse(props.info.AppDate)
    return <Card>
        <Text>
            {props.info.Name}
        </Text>
        <Text>
            {props.info.Position}
        </Text>
        {
            date === undefined ?
            <Text>
            { date.getDate+ '/' + date.getMonth+ '/' + date.getFullYear }
            </Text> :
            <Text />
        }
    </Card>
} 

export default Application