import React, { useState } from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Card, Overlay } from 'react-native-elements'
import styles, { SH, SW } from '../style/styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PieChart } from 'react-native-svg-charts'
import Applications from './applications'



const HomePage = () => {

    const status = useSelector(state => state.status)
    const [ visible, setVisibility ] = useState(false) 
    const [ overlayState, setOverlayState ] = useState({})

    const pieData = [{
        key: 'prospects',
        svg: {
            fill: 'blue',
        },
        value:10
    },{
        key: 'applied',
        svg: {
            fill: 'yellow',
        },
        value:10
    },{
        key: 'rejected',
        svg: {
            fill: 'red',
        },
        value:10
    },{
        key: 'accepted',
        svg: {
            fill: 'green',
        },
        value:10
    }]

    return <SafeAreaView>
        <ScrollView>
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
            />
            {
                status.map( (state) => {
                    return <TouchableOpacity
                        onPress={() => {
                            setOverlayState(state)
                            setVisibility(true)
                        }}
                        key={state}
                     >
                        <Card>
                            <Text>
                                {state}        
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
        </ScrollView>
    </SafeAreaView>
}

export default HomePage