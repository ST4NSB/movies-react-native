import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getCommentsAsync, submitCommentPostAsync } from "../utils/requests";

export default function MovieComments({ navigation }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  async function getMovieCommentsFromRequest() {
    const response = await getCommentsAsync(navigation.getParam("id"));
    if (!response.statusOk) {
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
    <View style={styles.container}>
      {comments.map((comm) => (
        <Text key={comm.id}>{comm.message}</Text>
      ))}

      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={2}
        onChangeText={setMessage}
        value={message}
      />

      <Button
        onPress={async () => {
          if (message) {
            const result = await submitCommentPostAsync(
              navigation.getParam("id"),
              message
            );
            if (!result.statusOk) {
              Alert.alert("Something went wrong", response.message);
            } else {
              await getMovieCommentsFromRequest();
            }
            setMessage("");
          } else {
            Alert.alert(
              "Error - sending message",
              "Write a message before submitting"
            );
          }
        }}
        title="Send"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
