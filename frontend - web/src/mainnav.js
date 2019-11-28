import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/privateRoute'
import Applications from './components/applications'
import Auth from './components/auth'
import NotFound from './components/pageNotFound'

const MainNav = () => {
    return <BrowserRouter>
        <Switch>
          <Route path="/login" component={Auth} />
          <PrivateRoute exact path="/applications" component={Applications}/>
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
}

export default MainNav