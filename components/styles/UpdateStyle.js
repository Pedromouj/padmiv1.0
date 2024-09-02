import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
    marginVertical: 25,
  },
  imageContainer: {
    flexDirection: "row", // Aligns items in a row
    justifyContent: "space-between", // Spreads items evenly
    alignItems: "center", // Centers items vertically
    marginBottom: 30,
    width: "100%", // Full width of the container
  },
  imageAnnex: {
    marginTop: 8,
    flexDirection: "row", // Aligns items in a row
    marginLeft: 4, // Spreads items evenly
    alignItems: "center", // Centers items vertically
    marginBottom: 30,
    margin: "auto",
    justifyContent: "center",
    width: "100%", // Full width of the container
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
  buttonText: {
    color: "#000",
    fontSize: 10, // Smaller font size for button text
    marginTop: 5, // Space between icon and text
  },
  icon: {
    color: "#000",
  },
  tooltipText: {
    position: "absolute",
    top: -25, // Position tooltip above the button
    backgroundColor: "#929191",
    color: "#000",
    padding: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  imagePreview: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginVertical: 12,
    borderColor: "#E0E0E0",
    borderWidth: 2,
  },
  additionalImage: {
    width: 90,
    height: 90,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 16,
    marginVertical: 12,
    fontSize: 16,
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  container_map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  map: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageListContainer: {
    marginVertical: 25,
  },
  noImagesText: {
    fontSize: 18,
    color: "#6C757D",
    textAlign: "center",
    marginVertical: 25,
  },
  localDesign: {
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#343A40",
    marginVertical: 12,
  },
  titleLocal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343A40",
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  textarea: {
    height: 120,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#FFFFFF",
  },
  editIcon: {
    position: "absolute",
    bottom: 10, // Adjust position as needed
    left: 1, // Adjust position as needed
    backgroundColor: "#000", // Optional: for icon background
    borderRadius: 20, // Optional: for rounded background
    padding: 5,
  },
  editContainer: {
    position: "relative",
  },
});
