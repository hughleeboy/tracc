import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RootReducer from './redux/rootReducer'
import MainNav from './mainnav'


const store = createStore(RootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  )
}

export default App