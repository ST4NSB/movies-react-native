import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView, Button, TextInput, StyleSheet, Text, Alert, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { authenticatePostAsync } from '../utils/requests';

export default function Login({ navigation }) {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');

    async function saveToken(value) {
        await SecureStore.setItemAsync('tokenKey', value);
    }

    useEffect(() => {
        if (navigation.getParam('invalidToken')) {
            Alert.alert('Session expired!', navigation.getParam('message'));
        }
    }, [navigation])
  
    return (
        <SafeAreaView>
            <Text>Username:</Text>
            <TextInput
                secureTextEntry={false}
                style={styles.input}
                onChangeText={setuserName}
                value={userName}
            />
            <Text>Password:</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button onPress={async () => {
                const result = await authenticatePostAsync(userName, password);
                if (!result.statusOk) {
                    Alert.alert('Error - Authentication', result.message);
                }
                else {
                    saveToken(result.token);
                    navigation.navigate('MoviesMain');
                }
            }} 
            title="Sign In" />
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

