import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';

export default function Login({ navigation }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function getToken() {
            const result = await SecureStore.getItemAsync('tokenKey');
            if (result) {
                setToken(result);
            }
        }
    
        getToken();
    }, [])

    async function saveToken(value) {
        await SecureStore.setItemAsync('tokenKey', value);
    }
  
    return (
        <View>
            <Text style="white">{token ?? "nimic de test"}</Text>
            <Button onPress={async () => {
                saveToken("test token pus");
            }} 
            title="Sign In" />

            <Button onPress={() => {
                navigation.navigate('MoviesMain')
            }} 
            title="More"/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

