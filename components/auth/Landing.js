import React from 'react'
import { Text, View, Pressable, StyleSheet, Pressable } from 'react-native'

export default function Landing({navigation}) {
    return (
        <View style={styles.container} >
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    title="Register"
                    onPress={() => navigation.navigate("Register")}
                    ></Pressable>
                <Pressable
                    style={styles.button}
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                    ></Pressable>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: '10%',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      flex: 1,
      margin: 10,
      borderRadius: 4,
      paddingVertical: 12,

    }
  });
  