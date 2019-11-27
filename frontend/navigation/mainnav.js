import React from "react"
import { TabBar } from "react-native-animated-nav-tab-bar"
import Icon from "react-native-vector-icons/Feather"
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import HomePage from "../components/homepage"
import ProfilePage from "../components/profilepage"

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomePage,
            Profile: ProfilePage,
        }, {
        tabBarIcon:
            { focused: true, horizontal: true, tintColor: "hello" },
        tabBarOptions: {
            activeTintColor: "#2B7C85",
            inactiveTintColor: "#222222",
        },

        tabBarComponent: props =>
            <TabBar
                activeColors={["#e6b580", "#8e87d6"]} // or 
                activeTabBackgrounds={["#ede7e6", "#eae3f6"]} // or 
                {...props}
            />,
    },
    ),
    HomePage.navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) =>
            <Icon
                size={24}
                color={"#e6b580"}
                focused={focused}
                tintColor={tintColor}
                name="home"
            />,
    },
    ProfilePage.navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) =>
            <Icon
                size={24}
                color={"#c095c9"}
                focused={focused}
                tintColor={tintColor}
                name="user"
            />
    }
)
