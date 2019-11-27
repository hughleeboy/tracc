import React from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Card } from 'react-native-elements'


const HomePage = () => {

    const status = useSelector(state => state.status)

    return <SafeAreaView>
        <ScrollView>
            {
                status.map( (state) => {
                    return <TouchableOpacity key={state}>
                        <Card>
                            <Text>
                                {state}        
                            </Text>
                        </Card>
                    </TouchableOpacity>
                })
            }

        </ScrollView>
    </SafeAreaView>
}

export default HomePage