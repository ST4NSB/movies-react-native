import * as React from "react";
import * as SecureStore from "expo-secure-store";
import {
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { authenticatePostAsync } from "../utils/requests";
import globalStyles from "../styles/globalStyles";

const localStyle = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  containerBttn: {
    marginVertical: 25,
  },
  layout: {
    margin: 20,
  },
});

export default function Login({ navigation }) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  async function saveToken(value) {
    await SecureStore.setItemAsync("tokenKey", value);
  }

  useEffect(() => {
    if (navigation.getParam("invalidToken")) {
      Alert.alert("Session expired", navigation.getParam("message"));
    }
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <View style={localStyle.layout}>
        <View style={localStyle.container}>
          <Text style={globalStyles.label}>Username:</Text>
          <TextInput
            secureTextEntry={false}
            style={globalStyles.input}
            onChangeText={setuserName}
            value={userName}
          />
        </View>
        <View style={localStyle.container}>
          <Text style={globalStyles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            style={globalStyles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={localStyle.containerBttn}>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={async () => {
              const result = await authenticatePostAsync(userName, password);
              if (!result.statusOk) {
                Alert.alert("Error - Authentication", result.message);
              } else {
                saveToken(result.token);
                navigation.navigate("MoviesMain");
              }
            }}
          >
            <Text style={globalStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
