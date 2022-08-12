import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MovieDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>{navigation.getParam('id')}</Text>
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

