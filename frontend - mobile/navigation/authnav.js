import { createAppContainer } from 'react-navigation'
import { createSwitchNavigator } from 'react-navigation'
import MainNav from './mainnav'
import Login from '../components/loginpage'
import Register from '../components/registerpage'

const Navigator = createSwitchNavigator({
        Login: Login,
        Register: Register,
        MainNav: MainNav,
      },
      {
        initialRouteName: 'Login',
      },
)

const AuthNav = createAppContainer(Navigator)

export default AuthNav