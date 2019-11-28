import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RootReducer from './redux/rootReducer'
import AuthNav from './navigation/authnav'

const store = createStore(RootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <AuthNav />
    </Provider>
  )
}


export default App