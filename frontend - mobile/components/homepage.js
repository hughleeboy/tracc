import React, { useState, useEffect } from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Overlay, Button } from 'react-native-elements'
import styles, { SH, SW } from '../style/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { url } from '../secrets'
import { PieChart } from 'react-native-svg-charts'
import Applications from './applications'
import ApplicationForm from './applicationForm'

const HomePage = () => {

    const [ pieState, setPieState] = useState([{
        key: 'prospect',
        title: 'Prospects',
        svg: {
            fill: '#30A9DE',
        },
        value:0
    },{
        key: 'pending',
        title: 'Applied',
        svg: {
            fill: '#EFDC05',
        },
        value:0
    },{
        key: 'reject',
        title: 'Rejected',
        svg: {
            fill: '#E53A40',
        },
        value:0
    },{
        key: 'accept',
        title: 'Accepted',
        svg: {
            fill: '#77AF9C',
        },
        value:0
    }])
    const user = useSelector(state => state.user)
    const [ visible, setVisibility ] = useState(false)
    const [ visibleForm, setVisibilityForm ] = useState(false) 
    const [ overlayState, setOverlayState ] = useState({})
    const dispatch = useDispatch()

    const updateState = () => {
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
                const pending_size = data.pending.length
                const accept_size = data.accept.length
                const reject_size = data.reject.length
                const prospect_size = data.prospect.length
                setPieState([{
                    key: 'prospect',
                    title: 'Prospects',
                    svg: {
                        fill: '#30A9DE',
                    },
                    value:prospect_size
                },{
                    key: 'pending',
                    title: 'Applied',
                    svg: {
                        fill: '#EFDC05',
                    },
                    value:pending_size
                },{
                    key: 'reject',
                    title: 'Rejected',
                    svg: {
                        fill: '#E53A40',
                    },
                    value:reject_size
                },{
                    key: 'accept',
                    title: 'Accepted',
                    svg: {
                        fill: '#77AF9C',
                    },
                    value:accept_size
                }])
                dispatch({type: 'GET_APPLICATIONS', data})

            } else {
                ToastAndroid.show(`There was an error getting the applications. ${data.err}`, ToastAndroid.SHORT)
            }
        })
        .catch(err => alert(err))
    }

    useEffect(()=>{
        updateState()
    },[])

    return <SafeAreaView>
        <ScrollView>
            <View style={{height: SH*0.10}} />
            <PieChart
                style={ { height: SH*0.35 } }
                data={ pieState }
            />
            {
                pieState.map( (state) => {
                    return <TouchableOpacity
                        onPress={() => {
                            setOverlayState(state.key)
                            setVisibility(true)
                            updateState()
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
                <ScrollView>
                    <Icon.Button
                        name='times' 
                        backgroundColor='white'
                        color='black' 
                        onPress={()=>{
                            setVisibility(false)
                            updateState()
                        }}
                    />
                    <Applications state={overlayState} />
                </ScrollView>
            </Overlay>
            <View style={{height: SH*0.05}} />
            <Button 
                title='Add Prospect' 
                onPress={ ()=> {
                    setVisibilityForm(true)
                    updateState()
                }}
            />
            <Overlay
                isVisible={visibleForm}
                windowBackonBackdropPress={() => setVisibilityForm(false)}
                groundColor='rgba(255, 255, 255, .5)'
                overlayBackgroundColor='white'
                width={SW*0.7}
                height={SH*0.5}
            >
                <ScrollView>
                    <Icon.Button
                        name='times' 
                        backgroundColor='white'
                        color='black' 
                        onPress={()=>{
                            updateState()
                            setVisibilityForm(false)
                        }}
                    />
                    <ApplicationForm 
                        closeModal={()=>{
                            updateState()
                            setVisibilityForm(false)
                        }}
                    />
                </ScrollView>
            </Overlay>
        </ScrollView>
    </SafeAreaView>
}

export default HomePage
