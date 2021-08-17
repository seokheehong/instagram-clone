import React, { Component } from 'react'
import { View, Button, Text, TextInput } from 'react-native'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        // bind to access the components to the 'this' var (global)
        this.onSignUp = this.onSignUp.bind(this)

    }

    onSignUp() {
        // grab the vars from above
        const { email, password, name } = this.state;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)     // 1:02:00: creating a document in a collection called "users"
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
            this.showAlert
        })
    }

    showAlert() 
        {Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
            {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
            },
            ],
            {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
                ),
            }
        );}

    render() {  // function that is called anytime state changes/loads
        return (
            <View>
                <TextInput
                    placeholder = "name"
                    onChangeText = {(name) => this.setState({name})}
                    // called whenever the user makes a change with the input,
                    // when called, the state is changed
                    // as in, second name is updated with the first name
                />
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
                    title="Sign Up"
                />

            </View>
        )
    }
}

export default Register
