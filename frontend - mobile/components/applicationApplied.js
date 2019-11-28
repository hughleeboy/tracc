import React from 'react'
import { Text, ToastAndroid } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { Col, Grid } from "react-native-easy-grid";

const Application = (props) => {

    const dispatch = useDispatch()
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
        <Grid>
            <Col>
                <Button 
                    onPress={()=>{
                        dispatch({type: 'APPLICATION_REJECTED', AppId: props.info.AppId })
                    ToastAndroid.show('Rejected! :(', ToastAndroid.SHORT)
                    }} 
                    title='Rejected!' 
                />
            </Col>
            <Col>
                <Button 
                    onPress={()=>{
                        dispatch({type: 'APPLICATION_ACCEPTED', AppId: props.info.AppId })
                    ToastAndroid.show('Accepted! :)', ToastAndroid.SHORT)
                    }} 
                    title='Accepted!' 
                />
            </Col>
        </Grid>
    </Card>
} 

export default Application