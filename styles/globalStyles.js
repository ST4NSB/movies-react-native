import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  templateLabel: {
    fontWeight: "bold",
    color: "#aaa",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    marginVertical: 8,
    padding: 10,
    color: "#555",
    backgroundColor: "#ddd",
    borderRadius: 7,
  },
  button: {
    backgroundColor: "#222",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#eee",
  },
});

export default globalStyles;
