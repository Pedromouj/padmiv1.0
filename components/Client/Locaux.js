import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Locaux({ data }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>Results :</Text>
      {data.map((item) => (
        <TouchableOpacity
          key={item?.local_id?.toString() || String(Math.random())}
          style={styles.clientItem}
        >
          <Text style={styles.clientName}>{item?.local_type}</Text>
          <View style={styles.clientDetails}>
            <Text style={styles.clientDetailText}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  clientItem: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  clientDetails: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  clientDetailText: {
    fontSize: 14,
    color: "#333",
  },
  titre: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16, // Adds some space between the title and the first item
  },
});
