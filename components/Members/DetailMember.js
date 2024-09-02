import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { useParams } from "react-router-native";
import { API_URL } from "@env";
import Previous from "../Tools/Previous";

export default function DetailMember() {
  const { id } = useParams();
  const [dataMember, setDataMember] = useState({});

  const fetchMemberById = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/member/${id}`);
      setDataMember(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchMemberById();
  }, [fetchMemberById]);

  return (
    <ScrollView style={styles.container}>
      <Previous route={"/Home"} />
      <Image
        source={{
          uri: `${API_URL}${dataMember.photo_path}`,
        }} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>Member Details</Text>
      <Text style={styles.label}>Nom complet:</Text>
      <Text style={styles.text}>
        {dataMember.prenom + " " + dataMember.nom}
      </Text>
      <Text style={styles.label}>Sexe:</Text>
      <Text style={styles.text}>{dataMember.sexe}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{dataMember.email}</Text>
      <Text style={styles.label}>Téléphone Contact:</Text>
      <Text style={styles.text}>{dataMember.tel}</Text>
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
    borderRadius: 50, // Half of width/height to make it fully rounded
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
    borderRadius: 8,
  },
  borderContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 16,
    marginTop: 16,
  },
});
