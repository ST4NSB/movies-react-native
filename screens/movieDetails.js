import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import { getMovieDetailsAsync } from "../utils/requests";

export default function MovieDetails({ navigation }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    async function getMovieDetailsFromRequest() {
      const response = await getMovieDetailsAsync(navigation.getParam("id"));
      if (!response.statusOk) {
        Alert.alert("Something went wrong", response.message);
      } else {
        setMovieDetails(response.details);
        setMovieCast(response.cast);
      }
    }

    getMovieDetailsFromRequest();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: movieDetails.posterUrl,
        }}
      />
      <Text>{movieDetails.title}</Text>
      <Text>{movieDetails.year}</Text>
      <Text>{movieDetails.duration}</Text>
      <Text>{movieDetails.rating}</Text>

      <Text>Cast:</Text>
      <>
        {movieCast.map((member, index) => (
          <Text key={index}>{member}</Text>
        ))}
      </>

      <Button
        onPress={() => {
          navigation.navigate("MovieComments", {
            id: navigation.getParam("id"),
          });
        }}
        title="Show comments"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
