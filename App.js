import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import firebase from 'firebase';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY6ufa7K8Y8E2bpVnwYWTMowLuB9v1k4I",
  authDomain: "instagram-clone-90f93.firebaseapp.com",
  projectId: "instagram-clone-90f93",
  storageBucket: "instagram-clone-90f93.appspot.com",
  messagingSenderId: "538351470955",
  appId: "1:538351470955:web:54eaf86716714d946fa42e",
  measurementId: "G-FCJ6L4K2Z2"
};

// makes sure that there are no firebase instances running at the moment
if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  // called whenever the component mounts
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })    
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
        return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>Loading</Text>
          </View>
        )
    }

    if(!loggedIn) {
      return (  
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* Make sure to npm install (npm i react-native-screens, @react-native-community/masked-view, react-native-gesture-handler) */}
        </Stack.Navigator>
      </NavigationContainer>);
    }

    return (
      <Provider store = {store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Main">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} />
          <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
          <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App