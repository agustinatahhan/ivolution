import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const atletasIniciales = [
  "Atleta 1",
  "Atleta 2",
  "Atleta 3",
  "Atleta 4",
  "Atleta 5",
];

export default function Atletas() {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [atletas, setAtletas] = useState(atletasIniciales);
  if (windowWidth === 0) {
    return null;
  }

  const filtrados = atletas.filter((atleta) =>
    atleta.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.formContainer,
          {
            width:
              windowWidth > 800 ? "80%" : windowWidth > 600 ? "80%" : "100%",
          },
        ]}
      >
        <Text style={styles.titulo}>Mis atletas</Text>

        <View style={styles.searchContainer}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)"]}
            style={styles.searchBackground}
            start={[0, 0]}
            end={[1, 0]}
          >
            <TextInput
              style={styles.input}
              placeholder="Buscar"
              placeholderTextColor={Colors.text.blanco}
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <Pressable
              style={styles.buttonSearch}
              onPress={() => {
                // Acción al presionar la lupa
                console.log("Buscar: ", busqueda);
              }}
            >
              {/* <Ionicons name="search" size={20} color={Colors.text.blanco} /> */}
              <Image
                source={require("@/assets/images/search.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </Pressable>
          </LinearGradient>
        </View>

        <FlatList
          data={filtrados}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          ListEmptyComponent={
            <Text style={styles.empty}>No se encontraron atletas</Text>
          }
        />

        <TouchableOpacity
          style={[
            styles.botonAgregar,
            Platform.OS === "web" && windowWidth > 600
              ? { right: 50, bottom: 50 }
              : {},
          ]}
          onPress={() => router.push("/(tabs)/nuevoAtleta")}
        >
          <Ionicons name="person-add" size={28} color={Colors.text.blanco} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  titulo: {
    color: Colors.text.blanco,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
    marginTop: 40,
  },

  input: {
    flex: 1,
    color: Colors.text.blanco,
    fontSize: 16,
  },
  searchBackground: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 0,
    width: "100%",
    height: 40,
  },

  buttonSearch: {
    backgroundColor: Colors.button.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: "stretch",
  },
  listContainer: {
    paddingBottom: 50,
  },
  item: {
    color: Colors.text.blanco,
    paddingVertical: 20,
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    padding: 20,
  },
  botonAgregar: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#3498db",
    padding: 18,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
