import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
// import { Icon } from "react-native-vector-icons/FontAwesome";
import { API_URL } from "@env";
import { useParams } from "react-router-native";
import Previous from "../Tools/Previous";
export default function DetailClient() {
  const { id } = useParams();
  const [dataClient, setDataClient] = useState({});
  const [photos, setPhotos] = useState([]);
  const [dataLocale, setDataLocale] = useState([]);
  const [photosLocale, setPhotosLocale] = useState([]);

  const fetchAllClientWithitPhoto = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/detail/${id}`);
      setDataClient(data?.client);
      setPhotos(data?.photos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAllLocales = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/locale/${id}`);
      setDataLocale(data?.locale);
      setPhotosLocale(data?.photos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllLocales();
  }, [fetchAllLocales]);

  useEffect(() => {
    fetchAllClientWithitPhoto();
  }, [fetchAllClientWithitPhoto]);

  return (
    <ScrollView style={styles.container}>
      <Previous route={"/Home"} />
      <Image
        source={{
          uri: `${API_URL}${dataClient.logo}`,
        }} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>Client Details</Text>
      <Text style={styles.label}>Raison Sociale:</Text>
      <Text style={styles.text}>{dataClient.raison_social}</Text>
      <Text style={styles.label}>Nom Contact:</Text>
      <Text style={styles.text}>{dataClient.nom_contact}</Text>
      <Text style={styles.label}>Prénom Contact:</Text>
      <Text style={styles.text}>{dataClient.prenom_contact}</Text>
      {/* <Text style={styles.label}>Position GPS:</Text>
      <Text style={styles.text}>{dataClient.position_gps}</Text> */}
      <Text style={styles.label}>Téléphone Contact:</Text>
      <Text style={styles.text}>{dataClient.tel_contact}</Text>
      <Text style={styles.label}>Email Contact:</Text>
      <Text style={styles.text}>{dataClient.email_contact}</Text>
      <Text style={styles.label}>Nombre d'Occurrence:</Text>
      <Text style={styles.text}>{dataClient.nombre_occurance}</Text>
      <Text style={styles.label}>Commentaire:</Text>
      <Text style={styles.text}>{dataClient.commentaire}</Text>

      <Text style={styles.title}>Client Images</Text>
      <Image
        source={{
          uri: `${API_URL}${dataClient.scan_visite_recto}`,
        }}
        style={styles.image}
      />
      <Image
        source={{
          uri: `${API_URL}${dataClient.scan_visite_verso}`,
        }}
        style={styles.image}
      />

      {photos.map((photo, index) => (
        <Image
          key={index}
          source={{ uri: `${API_URL}${photo}` }}
          style={styles.image}
        />
      ))}

      <View style={styles.borderContainer}>
        <Text style={styles.title}>Locale Details</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{dataLocale.description}</Text>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.text}>{dataLocale.type_libelle}</Text>
      </View>

      <Text style={styles.title}>Locale Photos</Text>
      {photosLocale.map((photo, index) => (
        <Image
          key={index}
          source={{ uri: `${API_URL}${photo}` }}
          style={styles.image}
        />
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10, // Half of width/height to make it fully rounded
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    color: "#666",
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderRadius: 10,
  },
  borderContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
    marginTop: 16,
  },
});
