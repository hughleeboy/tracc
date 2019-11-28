import React, { useState, useEffect } from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Overlay, Button } from 'react-native-elements'
import styles, { SH, SW } from '../style/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PieChart } from 'react-native-svg-charts'
import Applications from './applications'
import { url } from '../secrets'


const HomePage = () => {

    const status = useSelector(state => state.status)
    const user = useSelector(state => state.user)
    const [ visible, setVisibility ] = useState(false) 
    const [ overlayState, setOverlayState ] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(url+'applications', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Username: user.Username,
                Password: user.Password
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.err === 'none') {
                dispatch({type: 'GET_APPLICATIONS', data})
            } else {
                ToastAndroid.show(`There was an error getting the applications. ${data.err}`, ToastAndroid.SHORT)
            }
        })
        .catch(err => alert(err))
    })

    return <SafeAreaView>
        <ScrollView>
            <PieChart
                style={ { height: SH*0.35 } }
                data={ status }
            />
            {
                status.map( (state) => {
                    return <TouchableOpacity
                        onPress={() => {
                            setOverlayState(state.key)
                            setVisibility(true)
                        }}
                        key={state.key}
                     >
                        <Card>
                            <Text>
                                {state.title}        
                            </Text>
                        </Card>
                    </TouchableOpacity>
                })
            }
            <Overlay
                isVisible={visible}
                windowBackonBackdropPress={() => setVisibility(false)}
                groundColor='rgba(255, 255, 255, .5)'
                overlayBackgroundColor='white'
                width={SW*0.9}
                height={SH*0.9}
            >
                <View>
                    <Icon.Button
                        name='times' 
                        backgroundColor='white'
                        color='black' 
                        onPress={()=>setVisibility(false)}
                    />
                    <Applications state={overlayState} />
                </View>
            </Overlay>
            <Button title='Add Prospect' />
        </ScrollView>
    </SafeAreaView>
}

export default HomePage
