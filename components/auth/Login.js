import React, { Component } from 'react'
import { View, Button, Text, TextInput } from 'react-native'

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
