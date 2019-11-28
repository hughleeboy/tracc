import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import MainNav from './mainnav'
import Login from '../components/loginpage'
import Register from '../components/registerpage'

const Navigator = createStackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    MainNav: { screen: MainNav },
},
    Login.navigationOptions = {
        header: null,
    },
    Register.navigationOptions = {
        header: null,
    },
    MainNav.navigationOptions = {
        header: null,
    },
)

const AuthNav = createAppContainer(Navigator)

export default AuthNav