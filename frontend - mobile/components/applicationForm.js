import React, { useState } from 'react'
import { Text, ScrollView, ToastAndroid, Switch, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import styles, {SH} from '../style/styles'
import { Col, Grid } from "react-native-easy-grid";


const ApplicationForm = (props) => {

    const dispatch = useDispatch()
    const [ Name, setName ] = useState('')
    const [ Position, setPosition ] = useState('')
    const [ Applied, setApplied] = useState(false)

    const onSubmit = () => {
        const data = {Name, Position, Applied}
        if( Name === '' ) {
            ToastAndroid.show('Please enter the company name!', ToastAndroid.SHORT)  
        } else {
            dispatch({type: 'ADD_APPLICATION', data})
            ToastAndroid.show('Application added!', ToastAndroid.SHORT)  
            props.closeModal()
        }
    }


    return <ScrollView>
            <Text style={styles.application_form_title}>
                Application Form
            </Text>
            <Input placeholder='Enter Company Name' onChangeText={(Name) => setName(Name)} />
            <Input placeholder='Enter Position' onChangeText={(Position) => setPosition(Position)} />
            <View style={{paddingTop: SH*0.02}} /> 
            <Grid>
                <Col>
                    <Text style={styles.application_form_text}>
                        Applied: 
                    </Text>
                </Col>
                <Col>
                    <Switch value={Applied} onValueChange={(Applied) => setApplied(Applied)} />
                </Col>
            </Grid>
            <Button title='Add Application' onPress={()=>onSubmit()}/>
    </ScrollView>
}

export default ApplicationForm