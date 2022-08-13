import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getMovieDetailsAsync } from "../utils/requests";
import MovieItemBox from "../components/movieItemBox";
import globalStyles from "../styles/globalStyles";
import { FlatList } from "react-native-gesture-handler";

const localStyle = StyleSheet.create({
  layout: {
    marginHorizontal: 25,
  },
  spaceBox: {
    marginVertical: 20,
  },
});

export default function MovieDetails({ navigation }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    async function getMovieDetailsFromRequest() {
      const response = await getMovieDetailsAsync(navigation.getParam("id"));
      if (response.invalidToken) {
        navigation.navigate("Login", response);
      } else if (!response.statusOk) {
        Alert.alert("Something went wrong", response.message);
      } else {
        setMovieDetails(response.details);
        setMovieCast(response.cast);
      }
    }

    getMovieDetailsFromRequest();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={localStyle.spaceBox}>
        <MovieItemBox
          title={movieDetails.title}
          imageUrl={movieDetails.posterUrl}
          year={movieDetails.year}
          duration={movieDetails.duration}
          rating={movieDetails.rating}
        />
      </View>

      <View style={localStyle.layout}>
        <Text style={globalStyles.templateLabel}>Cast:</Text>
        <Text>
          {movieCast.map((member, index) => (
            <Text key={index} style={globalStyles.label}>
              {index ? ", " : ""}
              {member}
            </Text>
          ))}
        </Text>

        <TouchableOpacity
          style={[globalStyles.button, localStyle.spaceBox]}
          onPress={() => {
            navigation.navigate("MovieComments", {
              id: navigation.getParam("id"),
            });
          }}
        >
          <Text style={globalStyles.buttonText}>Show comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
