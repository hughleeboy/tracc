import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useSelector } from 'react-redux'

const ProfilePage = () => {

    const display = useSelector(state => state.displayProfile)

    return <SafeAreaView>
        <Text>
            {display}
        </Text>
    </SafeAreaView>
}

export default ProfilePage