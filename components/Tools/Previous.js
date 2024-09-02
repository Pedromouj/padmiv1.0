import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons

export default function Previous({ route }) {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigate(route)}>
        <Icon
          name="arrow-back-ios"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF", // Blue color like many phone apps use
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30, // More rounded button
    shadowColor: "#000", // Shadow for a more elevated effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow effect
  },
  text: {
    color: "white", // Sets the text color to white
    marginLeft: 10,
    fontSize: 16, // Font size for the text
    fontWeight: "600", // Slightly bolder text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
});
