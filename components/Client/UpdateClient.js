import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { styles } from "./styles/UpdateStyle";
import { useParams } from "react-router-native";
import { API_URL } from "@env";
import Previous from "../Tools/Previous";

function UpdateClient() {
  const { id } = useParams();
  const [Logo, setLogo] = useState(null);
  const [frontImage, setFrontImage] = useState({ frontImage: null });
  const [backImage, setBackImage] = useState({ backImage: null });
  const [nomContact, setNomContact] = useState({ nomContact: "" });
  const [prenomContact, setPrenomContact] = useState({ prenomContact: "" });
  const [telContact, setTelContact] = useState({ telContact: "" });
  const [emailContact, setEmailContact] = useState({ emailContact: "" });
  const [selectedType, setSelectedType] = useState({ selectedType: 21 });
  const [commentaire, setCommentaire] = useState({ commentaire: "" });
  const [location, setLocation] = useState({ location: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [imagesCount, setImagesCount] = useState([]);
  const [imagesCountLocals, setImagesCountLocals] = useState([]);
  const [zoom, setZoom] = useState(0.0922);
  const [selectedValue, setSelectedValue] = useState(1);
  const [textareaValue, setTextareaValue] = useState("");
  const [dataTypeLocal, setDataTypeLocal] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [showTitle, setShowTitle] = useState(null);
  const [ClientId, setIdClient] = useState(0);
  const [typeClients, setTypeClients] = useState([]);
  const [fakeLocales, setFakeLocales] = useState([]);

  // const fetchAllLocales = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(`${API_URL}/locale/${id}`);
  //     setRaisonSocial({
  //       raisonSocial: data.local.raison_social,
  //     });

  //     //   setDataLocale(data?.locale);
  //     //   setPhotosLocale(data?.photos);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchAllLocales();
  // }, [fetchAllLocales]);

  const fetchAllClientsTypes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/types/client`);
      setTypeClients(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllClientsTypes();
  }, [fetchAllClientsTypes]);

  const showAllDataTypeLocal = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/all/type-locaux`);
      setDataTypeLocal(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    showAllDataTypeLocal();
  }, [showAllDataTypeLocal]);

  const fetchAllClientWithitPhoto = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/detail/${id}`);
      // setDataClient(data?.client);
      setFrontImage;
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchAllClientWithitPhoto();
  }, [fetchAllClientWithitPhoto]);
  return (
    <View>
      <Previous route={"/Home"} />
      <Text>ID : {id}</Text>
    </View>
  );
}

export default UpdateClient;
// {ClientId !== 0 && (
//   <View>
//     <View style={styles.localDesign}>
//       <View style={styles.line} />
//       <Text style={styles.titleLocal}>Annexes</Text>
//       <View style={styles.line} />

//       <Picker
//         selectedValue={selectedValue}
//         style={styles.picker}
//         onValueChange={(itemValue) => setSelectedValue(itemValue)}
//       >
//         {dataTypeLocal.map((item) => (
//           <Picker.Item
//             key={item.id}
//             label={item.type_libelle}
//             value={item.id}
//           />
//         ))}
//       </Picker>
//       <TextInput
//         style={styles.textarea}
//         multiline={true}
//         numberOfLines={4}
//         onChangeText={setTextareaValue}
//         value={textareaValue}
//         placeholder="Enter your text here..."
//       />
//       <View style={styles.imageAnnex}>
//         <TouchableOpacity
//           style={styles.imageButton}
//           onPress={() =>
//             insertImagesCount(setImagesCountLocals, "camera")
//           }
//         >
//           <Icon
//             name="camera"
//             size={20}
//             color="#FFFFFF"
//             style={styles.icon}
//           />

//           <Text style={styles.buttonText}>Capture Locals</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.imageButton}
//           onPress={() =>
//             insertImagesCount(setImagesCountLocals, "library")
//           }
//         >
//           <Icon
//             name="photo"
//             size={20}
//             color="#FFFFFF"
//             style={styles.icon}
//           />
//           <Text style={styles.buttonText}>Select Photo</Text>
//         </TouchableOpacity>
//       </View>

//       {imagesCountLocals.length > 0 && (
//         <FlatList
//           data={imagesCountLocals}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <Image
//               source={{ uri: item.uri }}
//               style={styles.additionalImage}
//             />
//           )}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//         />
//       )}
//     </View>

//     <TouchableOpacity
//       style={styles.uploadButton}
//       onPress={handleCreateAnnexes}
//     >
//       <Text style={styles.uploadButtonText}>Valider Annexe</Text>
//     </TouchableOpacity>
//     {/* <Text>{fakeLocales}</Text> */}
//     <Locaux data={fakeLocales} />
//   </View>
// )}
