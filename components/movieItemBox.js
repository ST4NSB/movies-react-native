import * as React from "react";
import globalStyles from "../styles/globalStyles";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const localStyle = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    padding: 20,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
  },
  firstColumn: {
    width: "27%",
  },
  secondColumn: {
    width: "22%",
  },
  lastColumn: {
    width: "100%",
    flex: 1,
  },
  templateLabel: {
    fontWeight: "bold",
    color: "#999",
  },
  image: {
    width: 75,
    height: 120,
  },
});

export default function MovieItemBox({
  id,
  title,
  imageUrl,
  year,
  duration,
  rating,
  navigation,
}) {
  return (
    <View style={localStyle.container}>
      <TouchableOpacity
        style={localStyle.layout}
        onPress={() => navigation.navigate("MovieDetails", { id })}
      >
        <View style={localStyle.firstColumn}>
          <Image
            style={localStyle.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={localStyle.secondColumn}>
          <Text style={localStyle.templateLabel}>Title</Text>
          <Text style={localStyle.templateLabel}>Year</Text>
          <Text style={localStyle.templateLabel}>Duration</Text>
          <Text style={localStyle.templateLabel}>Rating</Text>
        </View>
        <View style={localStyle.lastColumn}>
          <Text style={globalStyles.label}>{title}</Text>
          <Text style={globalStyles.label}>{year}</Text>
          <Text style={globalStyles.label}>{duration}</Text>
          <Text style={globalStyles.label}>{rating}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
