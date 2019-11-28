import React from 'react'
import { Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { Col, Grid } from "react-native-easy-grid";

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