import React from 'react'
import { ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { Card } from 'react-native-elements'



const HomePage = () => {

    const display = useSelector(state => state.displayHome)

    return <SafeAreaView>
        <ScrollView>
            <TouchableOpacity>
                <Card>
                    <Text>
                        Hello there        
                    </Text>
                </Card>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
}

export default HomePage