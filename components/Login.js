// import axios from "axios";
// import { API_URL } from "@env";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigate } from "react-router-native";
// import { prefix } from "../Tools/Prefix";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // if (username.trim() !== "" && password.trim() !== "") {
      //   // const { data } = await axios.post(`${prefix}/login`, {
      //   //   username,
      //   //   password,
      //   // });
      //   // if (data?.token) {
      //   //   navigation.navigate("Home");
      //   //   await AsyncStorage.setItem("userToken", data?.token);
      //   // } else {
      //   //   Alert.alert("Login failed", "No token received");
      //   // }
      //   setTimeout(() => {
      //     navigate("/Home");
      //   }, 2000);
      // }
      navigate("/Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Login failed", "An error occurred");
    }
    // navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/tennis.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome Back to padmi!</Text>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#666"
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name="lock-closed-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>FingerPrint ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#3498db",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
