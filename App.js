// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import LoginScreen from "./components/Login";
import SearchClient from "./components/SearchClient";
import CreateMembers from "./components/Members/CreateMembers";
import DetailClient from "./components/Client/DetailClient";
import UpdateClient from "./components/Client/UpdateClient";
import DetailMember from "./components/Members/DetailMember";
import CreateClients from "./components/Client/CreateClients";
import UpdateMember from "./components/Members/UpdateMember";
// const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/Home" element={<SearchClient />} />
        <Route path="/CreateMembers" element={<CreateMembers />} />
        <Route path="/detailClient/:id" element={<DetailClient />} />
        <Route path="/updateClient/:id" element={<UpdateClient />} />
        <Route path="/updateMember/:id" element={<UpdateMember />} />
        <Route path="/detailMember/:id" element={<DetailMember />} />
        <Route path="/createClient" element={<CreateClients />} />
      </Routes>
    </NativeRouter>
  );
}
