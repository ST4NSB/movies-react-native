import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getCommentsAsync, submitCommentPostAsync } from "../utils/requests";
import globalStyles from "../styles/globalStyles";

export default function MovieComments({ navigation }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  async function getMovieCommentsFromRequest() {
    const response = await getCommentsAsync(navigation.getParam("id"));
    if (response.invalidToken) {
      navigation.navigate("Login", response);
    } else if (!response.statusOk) {
      Alert.alert("Something went wrong", response.message);
      navigation.navigate("MovieDetails", { id: navigation.getParam("id") });
    } else {
      setComments(response.data);
    }
  }

  useEffect(() => {
    getMovieCommentsFromRequest();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={localStyle.layout}>
        <FlatList
          scrollIndicatorInsets={{ right: 1 }}
          data={comments}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => (
            <View
              key={item.id}
              style={[
                localStyle.messagesBox,
                index === 0 ? { marginVertical: 20 } : { marginBottom: 20 },
              ]}
            >
              <Text style={globalStyles.label}>{item.message}</Text>
            </View>
          )}
        />
      </View>

      <TextInput
        style={localStyle.input}
        onChangeText={setMessage}
        value={message}
        placeholder={"Type a message"}
      />

      <TouchableOpacity
        style={[globalStyles.button, localStyle.button]}
        onPress={async () => {
          if (message) {
            setMessage("");
            const response = await submitCommentPostAsync(
              navigation.getParam("id"),
              message
            );
            if (response.invalidToken) {
              navigation.navigate("Login", response);
            } else if (!response.statusOk) {
              Alert.alert("Something went wrong", response.message);
            } else {
              await getMovieCommentsFromRequest();
            }
          } else {
            Alert.alert(
              "Error - sending message",
              "Write a message before submitting"
            );
          }
        }}
      >
        <Text style={globalStyles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyle = StyleSheet.create({
  layout: {
    width: "100%",
    height: "100%",
  },
  messagesBox: {
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: "#ccc",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    padding: 20,
    fontWeight: "bold",
    backgroundColor: "#ddd",
    color: "#333",
    borderWidth: 1,
    borderColor: "#bbb",
  },
  button: {
    width: 80,
    position: "absolute",
    bottom: "3%",
    right: "3%",
  },
});
