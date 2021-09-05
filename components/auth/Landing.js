import React from 'react'
import { Text, View, Button } from 'react-native'

export default function Landing({navigation}) {
    return (
        <View stype={{ flex: 1, justifyContent: 'center'}}>
            <View style = {{ marginTop: '10%' }}>
                <Button
                    title="Register"
                    onPress={() => navigation.navigate("Register")}
                    ></Button>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                    ></Button>
            </View> 
        </View>
    )
}
