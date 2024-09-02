import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "@env";

import Icon from "react-native-vector-icons/FontAwesome";
import { useParams } from "react-router-native";
import Previous from "../Tools/Previous";

export default function UpdateMember() {
  const { id } = useParams();
  // Initialize state
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [photoPath, setPhotoPath] = useState(null);

  const fetchMemberById = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/member/${id}`);

      // Assuming data has the structure { nom, prenom, sexe, email, tel, photo_path }
      setNom(data.nom || "");
      setPrenom(data.prenom || "");
      setSexe(data.sexe || "");
      setEmail(data.email || "");
      setTel(data.tel || "");
      setPhotoPath(API_URL + data.photo_path || null);
      console.log("data Members", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMemberById();
  }, [id]); // Note: Added `id` dependency to refetch if `id` changes

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoPath(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("sexe", sexe);
      formData.append("email", email);
      formData.append("tel", tel);
      formData.append("image", {
        uri: photoPath,
        type: "image/jpeg",
        name: `Member_image_${Date.now()}.jpg`, // Provide a unique name if needed
      });
      formData.append("id_member", id);
      await axios.put(`${API_URL}/update/member`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert("Member updated successfully !");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Logo */}
      <Previous route={"/Home"} />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Enter your nom"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Enter your prénom"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Sexe</Text>
      <Picker
        selectedValue={sexe}
        style={styles.picker}
        onValueChange={(itemValue) => setSexe(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" enabled={false} />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
        <Picker.Item label="Not Specified" value="not specified" />
      </Picker>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telephone</Text>
      <TextInput
        style={styles.input}
        value={tel}
        onChangeText={setTel}
        placeholder="Enter your telephone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Photo</Text>
      {/* <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
      <Text style={styles.photoButtonText}>Choose Photo</Text>
    </TouchableOpacity> */}
      {!photoPath && (
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleChoosePhoto}
        >
          <Icon name="photo" size={20} color="#FFFFFF" style={styles.icon} />
          <Text>Browse</Text>
        </TouchableOpacity>
      )}
      {/* {photoPath && <Image source={{ uri: photoPath }} style={styles.photo} />} */}
      {photoPath && (
        <View style={styles.editContainer}>
          <Image source={{ uri: photoPath }} style={styles.imagePreview} />

          {/* Pencil Icon */}
          <TouchableOpacity style={styles.editIcon} onPress={handleChoosePhoto}>
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    alignItems: "center", // Center content horizontally
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "left",
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  photoButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    color: "#000",
  },
  imageButton: {
    flexDirection: "column", // Keeps icons and text stacked vertically
    alignItems: "center", // Centers content horizontally
    justifyContent: "left", // Centers content vertically
    backgroundColor: "#fff",
    color: "#000",
    padding: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed", // Dashed border style
    width: 70, // Small width for the buttons
    height: 70, // Optional: Keep the buttons square
    marginHorizontal: 5,
    marginBottom: 10,
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
  imagePreview: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginVertical: 12,
    borderColor: "#E0E0E0",
    borderWidth: 2,
  },
});
