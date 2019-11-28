import { StyleSheet, Dimensions } from 'react-native'

export const SW = Math.round(Dimensions.get("window").width)
export const SH = Math.round(Dimensions.get("window").height)

const styles = StyleSheet.create({
    auth_title: {
        paddingTop: SH * 0.20, 
        fontSize: 19,
        fontWeight: 'bold',
    },
    action_button_icon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default styles