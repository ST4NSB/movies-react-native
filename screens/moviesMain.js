import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getMoviesAsync } from '../utils/requests';

export default function MoviesMain({ navigation }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getMoviesFromRequest() {
            const response = await getMoviesAsync();
            if (response.invalidToken) {
                navigation.navigate('Login', response);
            }
            else if(!response.statusOk) {
                Alert.alert('Error - Fetching','Something went wrong! Try again later!');
            }
            else {
                setMovies(response.data);
            }
        }
      
        getMoviesFromRequest();
    }, [])

    return (
        <View style={styles.container}>
        <Text style="white">Home page</Text>
        
        <FlatList
            data={movies}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate('MovieDetails', item)
                }>
                    <Image style={{width: 100, height: 100}}
                    source={{
                        uri: item.posterUrl,
                    }} />
                    <Text>{item.title}</Text>
                    <Text>{item.year}</Text>
                    <Text>{item.duration}</Text>
                    <Text>{item.rating}</Text>
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

