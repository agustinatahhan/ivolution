import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

const schema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),

  apellido: Yup.string()
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .required("El apellido es obligatorio"),

  id: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener exactamente 8 números")
    .required("El número de ID es obligatorio"),

  email: Yup.string()
    .email("Email inválido")
    .required("El correo es obligatorio"),

  grupo: Yup.string().required("Seleccione un grupo"),
});


export default function nuevoAtleta() {
  const { width: windowWidth } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  if (windowWidth === 0) {
    return null;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Datos enviados:", { ...data, foto: image });

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      router.push("/(tabs)/atletas");
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.formContainer,
              {
                width:
                  windowWidth > 800
                    ? "80%"
                    : windowWidth > 600
                    ? "80%"
                    : "100%",
              },
            ]}
          >
            <Text style={styles.titulo}>Agregar atleta</Text>

            <View style={styles.imageContainer}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("@/assets/images/profile-placeholder.png")
                }
                style={styles.image}
              />
              <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                <Ionicons name="pencil" size={20} color={Colors.text.blanco} />
              </TouchableOpacity>
            </View>

            {["nombre", "apellido", "id", "email", "grupo"].map((fieldName) => (
              <View key={fieldName} style={styles.field}>
                <Text style={styles.label}>
                  {fieldName === "id"
                    ? "Número de ID *"
                    : fieldName === "email"
                    ? "Correo electrónico *"
                    : fieldName === "grupo"
                    ? "Grupo de pertenencia *"
                    : `${
                        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                      } *`}
                </Text>
                <Controller
                  control={control}
                  name={fieldName}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder={
                        fieldName === "nombre"
                          ? "Inserte nombre"
                          : fieldName === "apellido"
                          ? "Inserte apellido"
                          : fieldName === "id"
                          ? "11235693"
                          : fieldName === "email"
                          ? "anonimo@gmail.com"
                          : "Seleccione un grupo"
                      }
                      placeholderTextColor={Colors.text.inhabilitado}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={
                        fieldName === "id"
                          ? "numeric"
                          : fieldName === "email"
                          ? "email-address"
                          : "default"
                      }
                      autoCapitalize={
                        fieldName === "email" ? "none" : "sentences"
                      }
                    />
                  )}
                />
                {errors[fieldName] && (
                  <Text style={styles.error}>{errors[fieldName]?.message}</Text>
                )}
              </View>
            ))}

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "#333",
            padding: 30,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 250,
            maxWidth: 300,
          }}
        >
          <Ionicons name="checkmark" size={48} color={Colors.button.primary} />
          <Text
            style={{
              marginTop: 15,
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
            }}
          >
            ¡Atleta creado con éxito!
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
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
    alignSelf: "center",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.button.primary,
    borderRadius: 20,
    padding: 6,
    borderColor: Colors.background,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: Colors.text.blanco,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.text.blanco,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "web" ? 10 : 14,

    marginBottom: 3,
  },
  error: {
    color: Colors.text.blanco,
    marginTop: 5,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: Colors.button.primary,
    width: 156,
    height: 48,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
