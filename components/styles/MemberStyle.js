import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginLeft: 8,
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    marginLeft: 8,
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#1c9f34",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginVertical: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
    paddingBottom: 4,
    textAlign: "center",
  },
  clientItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
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
  editIcon: {
    marginLeft: 16,
  },
  imageButton: {
    flexDirection: "column", // Keeps icons and text stacked vertically
    alignItems: "center", // Centers content horizontally
    justifyContent: "center", // Centers content vertically
    backgroundColor: "#fff",
    color: "#000",
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed", // Dashed border style
    width: 70, // Small width for the buttons
    height: 70, // Optional: Keep the buttons square
    marginHorizontal: 5,
  },
});
