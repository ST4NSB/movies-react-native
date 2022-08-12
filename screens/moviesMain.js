import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function MoviesMain({ navigation }) {
    const [movies, setMovies] = useState([
        {
            "id": 1,
            "title": "The Book of Boba Fett",
            "posterUrl": "https://sarzhevsky.com/movies-api/static/posters/1.jpg",
            "year": 2021,
            "duration": "38m",
            "rating": "7.6"
        }, 
        {
            "id": 2,
            "title": "Reacher",
            "posterUrl": "https://sarzhevsky.com/movies-api/static/posters/2.jpg",
            "year": 2022,
            "duration": "49m",
            "rating": "8.5"
        }
    ]);

    return (
        <View style={styles.container}>
        <Text style="white">Home page</Text>
        
        <FlatList
            data={movies}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate('MovieDetails', item)
                }>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            )}
        />
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

