import React, { Component } from 'react'
import { View, Button, Text, TextInput, StyleSheet } from 'react-native'

import firebase from 'firebase'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        // bind to access the components to the 'this' var (global)
        this.onSignUp = this.onSignUp.bind(this)

    }

    onSignUp() {
        // grab the vars from above
        const { email, password } = this.state;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {  // function that is called anytime state changes/loads
        return (
            <View>
                <TextInput
                    placeholder = "email"
                    onChangeText = {(email) => this.setState({email})}
                />
                <TextInput
                    placeholder = "password"
                    secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})}
                />

                <Button
                    onPress = {() => this.onSignUp()}
                    title="Sign In"
                />

            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });
  