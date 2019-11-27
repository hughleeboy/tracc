import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Applications from './components/applications'
import PrivateRoute from './components/privateRoute'
import Login from './components/login'


const MainNav = () => {
    return <BrowserRouter>
        <Switch>
          {/* <PrivateRoute path="/" /> */}
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/applications" component={Applications}/>
        </Switch>
    </BrowserRouter>
}

export default MainNav