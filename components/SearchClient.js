import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { API_URL } from "@env";
import axios from "axios";
import { useNavigate } from "react-router-native";

export default function SearchClient() {
  const [data, setData] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    try {
      if (value !== "") {
        const { data } = await axios.get(`${API_URL}/search/${value}`);
        const response = await axios.get(`${API_URL}/search/member/${value}`);
        setData(data);
        setDataMember(response.data);
      } else {
        setData([]);
        setDataMember([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Etablissement ..."
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("/createClient")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigate("/CreateMembers")}
        >
          <Icon name="user-plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {data.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Etablissements :</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id_client.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigate(`/detailClient/${item.id_client}`)}
                style={styles.clientItem}
              >
                <View style={styles.cardContent}>
                  <Image
                    source={{
                      uri: `${API_URL}${item.logo}`,
                    }}
                    style={styles.logo}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.clientName}>{item.raison_social}</Text>
                    {/* <Text style={styles.clientDetailText}>
                      Tel: {item.tel_contact}
                    </Text> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => navigate(`/updateClient/${item.id_client}`)}
                    style={styles.editIconContainer}
                  >
                    <Icon
                      name="pencil"
                      size={24}
                      color="green"
                      style={styles.editIcon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {dataMember.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Members :</Text>
          <FlatList
            data={dataMember}
            keyExtractor={(item) => item.id_membre}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.clientItem}
                onPress={() => navigate(`/detailMember/${item.id_membre}`)}
              >
                <View style={styles.cardContent}>
                  <Image
                    source={{
                      uri: `${API_URL}${item.photo_path}`,
                    }}
                    style={styles.logo}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.clientName}>
                      {item.nom + " " + item.prenom}
                    </Text>
                    {/* <Text style={styles.clientDetailText}>Tel: {item.tel}</Text> */}
                  </View>

                  <TouchableOpacity
                    onPress={() => navigate(`/updateMember/${item.id_membre}`)}
                  >
                    <Icon
                      name="pencil"
                      size={24}
                      color="green"
                      style={styles.editIcon}
                    />
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.clientDetails}>
                  <Text style={styles.clientDetailText}>Tel: {item.tel}</Text>
                </View> */}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 30,
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
  button2: {
    marginLeft: 8,
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#1c9f34",
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  clientItem: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  clientContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  clientDetails: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  clientDetailText: {
    fontSize: 14,
    color: "#666",
  },
  editIcon: {
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
