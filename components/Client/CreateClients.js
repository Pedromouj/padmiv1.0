import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Locaux from "./Locaux";
import Previous from "../Tools/Previous";
import { API_URL } from "@env";
import { styles } from "../styles/CreateStyle";
// import MapView, { Marker } from "react-native-maps";

export default function CreateClients() {
  const [Logo, setLogo] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [prenomContact, setPrenomContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [commentaire, setCommentaire] = useState("");

  const location_ = {
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  };
  const [location, setLocation] = useState(location_);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
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
  const [selectedType, setSelectedType] = useState(21);
  const [fakeLocales, setFakeLocales] = useState([]);
  const [formOb, setFormOb] = useState({
    nomContact: "",
    raisonSocial: "",
    telContact: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setFormOb({
      ...formOb,
      [name]: value,
    });

    if (value) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    Object.keys(formOb).forEach((key) => {
      if (!formOb[key]) {
        newErrors[key] = `${key} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitudeDelta: zoom,
        // longitudeDelta: zoom,
      });
      setLoading(false);
    })();
  }, [zoom]);

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
      Alert.alert(
        "Permission required",
        "You need to grant camera and media library permissions to use this feature."
      );
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleImagePicker = async (setImage, source) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else if (source === "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (Logo) {
      formData.append("logo", {
        uri: Logo,
        type: "image/jpeg",
        name: "logo.jpg",
      });
    }
    if (frontImage) {
      formData.append("scan_visite_recto", {
        uri: frontImage,
        type: "image/jpeg",
        name: "front.jpg",
      });
    }

    if (backImage) {
      formData.append("scan_visite_verso", {
        uri: backImage,
        type: "image/jpeg",
        name: "back.jpg",
      });
    }

    // Append other form data
    formData.append("raison_social", formOb.raisonSocial);
    formData.append("nom_contact", formOb.nomContact);
    formData.append("prenom_contact", prenomContact);
    formData.append(
      "position_gps",
      `latitude : ${location.coords.latitude} , longitude:${location.coords.longitude}`
    );
    formData.append("tel_contact", formOb.telContact);
    formData.append("email_contact", emailContact);
    formData.append("commentaire", commentaire);
    formData.append("id_type", selectedType);
    try {
      if (validate()) {
        setLoadingAll(true);
        const response = await axios.post(
          `${API_URL}/create/client`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // const idClient = response.data;
        setIdClient(response.data);
        // console.log("idClient", idClient);
        await Promise.all(
          imagesCount.map(async (item) => {
            try {
              if (item.uri !== null) {
                const formDataImage = new FormData();
                formDataImage.append("image", {
                  uri: item.uri,
                  type: "image/jpeg",
                  name: `image_${Date.now()}.jpg`, // Provide a unique name if needed
                });
                formDataImage.append("id_client", idClient);

                const { data } = await axios.post(
                  `${API_URL}/create/client-images`,
                  formDataImage,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log("Image upload response:", data);
              }
            } catch (error) {
              console.error(
                "Error uploading image:",
                error.response ? error.response.data : error.message
              );
            }
          })
        );

        Alert.alert("Etablissement created successfully !");
      }
    } catch (error) {
      console.error(
        "Upload failed:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Upload failed:",
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setLoadingAll(false);
    }
  };

  const handleCreateAnnexes = async () => {
    try {
      setImagesCountLocals([]);
      setLoadingAll(true);
      const { data } = await axios.post(`${API_URL}/create/locaux`, {
        client_id: ClientId,
        type_locaux_id: parseInt(selectedValue),
        description: textareaValue,
      });

      const local = dataTypeLocal.filter(
        (item) => item.id === parseInt(selectedValue)
      );

      const idLocal = data;

      fakeLocales.push({
        local_id: idLocal,
        local_type: local[0].type_libelle,
        description: textareaValue,
      });
      console.log("fakeLocales", fakeLocales);
      await Promise.all(
        imagesCountLocals.map(async (item) => {
          try {
            if (item.uri !== null) {
              const formDataImage = new FormData();
              formDataImage.append("image", {
                uri: item.uri,
                type: "image/jpeg",
                name: `Local_image_${Date.now()}.jpg`, // Provide a unique name if needed
              });
              formDataImage.append("local_id", idLocal);

              const { data } = await axios.post(
                `${API_URL}/create/locaux-images`,
                formDataImage,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("Image upload response:", data);
            }
          } catch (error) {
            console.error(
              "Error uploading image:",
              error.response ? error.response.data : error.message
            );
          }
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAll(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  if (loadingAll) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Creating Client...</Text>
      </View>
    );
  }

  const insertImagesCount = async (setImages, source) => {
    let result;
    if (source === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else if (source === "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        { uri: result.assets[0].uri }, // Consistent naming
      ]);
    }
    console.log(result.assets[0].uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Previous route={"/Home"} />
      <Text style={styles.title}>Etablissement </Text>
      {!Logo && (
        <TouchableOpacity
          style={styles.imageButton}
          onPressIn={() => setShowTitle("Select Photo2")}
          onPressOut={() => setShowTitle(null)}
          onPress={() => handleImagePicker(setLogo, "library")}
        >
          <Icon name="photo" size={20} color="#FFFFFF" style={styles.icon} />
          <Text>Logo</Text>
          {showTitle === "Select Photo2" && (
            <Text style={styles.tooltipText}>{showTitle}</Text>
          )}
        </TouchableOpacity>
      )}

      {Logo && (
        <View style={styles.editContainer}>
          <Image source={{ uri: Logo }} style={styles.imagePreview} />

          {/* Pencil Icon */}
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleImagePicker(setLogo, "library")}
          >
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={[styles.input, errors.raisonSocial ? styles.errorInput : null]}
        placeholder="Etablissement"
        value={formOb.raisonSocial}
        onChangeText={(value) => handleChange("raisonSocial", value)}
      />
      {errors.raisonSocial && (
        <Text style={styles.errorText}>{errors.raisonSocial}</Text>
      )}

      <TextInput
        style={[styles.input, errors.nomContact ? styles.errorInput : null]}
        placeholder="Nom Contact"
        value={formOb.nomContact}
        onChangeText={(value) => handleChange("nomContact", value)}
      />
      {errors.nomContact && (
        <Text style={styles.errorText}>{errors.nomContact}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Prénom Contact"
        value={prenomContact}
        onChangeText={setPrenomContact}
      />
      {/* <Text>{selectedType}</Text> */}

      <Picker
        selectedValue={selectedType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        {typeClients?.map((item) => (
          <Picker.Item key={item.id} label={item.Libelle} value={item.id} />
        ))}
      </Picker>

      <View style={styles.container_map}>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : location ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Icon name="map-marker" size={24} color="black" />
            <Text
              style={{
                marginLeft: 16,
                gap: 8,
              }}
            >
              Latitude:{" "}
              <Text style={{ color: "blue" }}>{location.coords.latitude}</Text>,
              Longitude:{" "}
              <Text style={{ color: "green" }}>
                {location.coords.longitude}
              </Text>
            </Text>
          </View>
        ) : (
          <Text>No location data available</Text>
        )}
      </View>
      <TextInput
        style={[styles.input, errors.telContact ? styles.errorInput : null]}
        placeholder="Téléphone Contact"
        value={formOb.telContact}
        onChangeText={(value) => handleChange("telContact", value)}
        keyboardType="phone-pad"
      />
      {errors.telContact && (
        <Text style={styles.errorText}>{errors.telContact}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email Contact"
        value={emailContact}
        onChangeText={setEmailContact}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Commentaire"
        value={commentaire}
        onChangeText={setCommentaire}
        multiline
        numberOfLines={4}
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPressIn={() => setShowTitle("Select Photo")}
          onPressOut={() => setShowTitle(null)}
          onPress={() => handleImagePicker(setFrontImage, "library")}
        >
          <Icon name="photo" size={20} color="#FFFFFF" style={styles.icon} />
          {showTitle === "Select Photo" && (
            <Text style={styles.tooltipText}>{showTitle}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageButton}
          onPressIn={() => setShowTitle("BC (Front)")}
          onPressOut={() => setShowTitle(null)}
          onPress={() => handleImagePicker(setFrontImage, "camera")}
        >
          <Icon name="camera" size={20} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>BC (Front)</Text>
          {showTitle === "BC (Front)" && (
            <Text style={styles.tooltipText}>{showTitle}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageButton}
          onPressIn={() => setShowTitle("BC (Back)")}
          onPressOut={() => setShowTitle(null)}
          onPress={() => handleImagePicker(setBackImage, "camera")}
        >
          <Icon name="camera" size={20} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>BC (Back)</Text>
          {showTitle === "BC (Back)" && (
            <Text style={styles.tooltipText}>{showTitle}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageButton}
          onPressIn={() => setShowTitle("Capture Additional")}
          onPressOut={() => setShowTitle(null)}
          onPress={() => insertImagesCount(setImagesCount, "camera")}
        >
          <Icon name="plus" size={20} color="#FFFFFF" style={styles.icon} />
          <Icon name="camera" size={20} color="#FFFFFF" style={styles.icon} />
          {showTitle === "Capture Additional" && (
            <Text style={styles.tooltipText}>{showTitle}</Text>
          )}
        </TouchableOpacity>
      </View>

      {frontImage && (
        <View style={styles.editContainer}>
          <Image source={{ uri: frontImage }} style={styles.imagePreview} />

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleImagePicker(setFrontImage, "library")}
          >
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {backImage && (
        <View style={styles.editContainer}>
          <Image source={{ uri: backImage }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => handleImagePicker(setBackImage, "library")}
          >
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {imagesCount.length > 0 && (
        <FlatList
          data={imagesCount}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.editContainer}>
              <Image
                source={{ uri: item.uri }}
                style={styles.additionalImage}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => handleImagePicker(setImagesCount, "camera")}
              >
                <Icon name="edit" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Valider</Text>
      </TouchableOpacity>
      {ClientId !== 0 && (
        <View>
          <View style={styles.localDesign}>
            <View style={styles.line} />
            <Text style={styles.titleLocal}>Annexes</Text>
            <View style={styles.line} />

            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {dataTypeLocal.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.type_libelle}
                  value={item.id}
                />
              ))}
            </Picker>
            <TextInput
              style={styles.textarea}
              multiline={true}
              numberOfLines={4}
              onChangeText={setTextareaValue}
              value={textareaValue}
              placeholder="Enter your text here..."
            />
            <View style={styles.imageAnnex}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() =>
                  insertImagesCount(setImagesCountLocals, "camera")
                }
              >
                <Icon
                  name="camera"
                  size={20}
                  color="#FFFFFF"
                  style={styles.icon}
                />

                <Text style={styles.buttonText}>Capture Locals</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imageButton}
                onPress={() =>
                  insertImagesCount(setImagesCountLocals, "library")
                }
              >
                <Icon
                  name="photo"
                  size={20}
                  color="#FFFFFF"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Select Photo</Text>
              </TouchableOpacity>
            </View>

            {imagesCountLocals.length > 0 && (
              <FlatList
                data={imagesCountLocals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.additionalImage}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleCreateAnnexes}
          >
            <Text style={styles.uploadButtonText}>Valider Annexe</Text>
          </TouchableOpacity>
          {/* <Text>{fakeLocales}</Text> */}
          <Locaux data={fakeLocales} />
        </View>
      )}
    </ScrollView>
  );
}

// {location.coords.latitude && location.coords.longitude && (
//   <MapView
//     style={styles.map}
//     region={region}
//     onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//   >
//     <Marker
//       coordinate={{
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       }}
//       title="You are here"
//     />
//   </MapView>
// )}
