import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getMoviesAsync } from "../utils/requests";
import MovieItemBox from "../components/movieItemBox";
import globalStyles from "../styles/globalStyles";

export default function MoviesMain({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMoviesFromRequest() {
      const response = await getMoviesAsync();
      if (response.invalidToken) {
        navigation.navigate("Login", response);
      } else if (!response.statusOk) {
        Alert.alert("Something went wrong", response.message);
      } else {
        setMovies(response.data);
      }
    }

    getMoviesFromRequest();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={movies}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("MovieDetails", { id: item.id })}
            style={index === 0 ? { marginVertical: 20 } : { marginBottom: 20 }}
          >
            <MovieItemBox
              title={item.title}
              imageUrl={item.posterUrl}
              year={item.year}
              duration={item.duration}
              rating={item.rating}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
