import * as React from "react";
import globalStyles from "../styles/globalStyles";
import { StyleSheet, Text, View, Image } from "react-native";

const localStyle = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    padding: 20,
  },
  layout: {
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
  textSpace: {
    paddingBottom: 9,
  },
  image: {
    width: 75,
    height: 110,
  },
});

export default function MovieItemBox({
  title,
  imageUrl,
  year,
  duration,
  rating,
}) {
  return (
    <View style={localStyle.container}>
      <View style={localStyle.layout}>
        <View style={localStyle.firstColumn}>
          <Image
            style={localStyle.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <View style={localStyle.secondColumn}>
          <Text style={[globalStyles.templateLabel, localStyle.textSpace]}>
            Title
          </Text>
          <Text style={[globalStyles.templateLabel, localStyle.textSpace]}>
            Year
          </Text>
          <Text style={[globalStyles.templateLabel, localStyle.textSpace]}>
            Duration
          </Text>
          <Text style={[globalStyles.templateLabel, localStyle.textSpace]}>
            Rating
          </Text>
        </View>
        <View style={localStyle.lastColumn}>
          <Text style={[globalStyles.label, localStyle.textSpace]}>
            {title}
          </Text>
          <Text style={[globalStyles.label, localStyle.textSpace]}>{year}</Text>
          <Text style={[globalStyles.label, localStyle.textSpace]}>
            {duration}
          </Text>
          <Text style={[globalStyles.label, localStyle.textSpace]}>
            {rating}
          </Text>
        </View>
      </View>
    </View>
  );
}
