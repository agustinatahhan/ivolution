import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)"]}
              style={{ flex: 1 }}
              start={[0, 0]}
              end={[1, 0]}
            />
          </View>
        ),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
          textAlign: "center",
        },
        tabBarItemStyle: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
          height: 70 + insets.bottom, // Ajustar altura para Safe Area
          paddingBottom: 5 + insets.bottom, // Aumentar padding inferior
          paddingTop: 10,
          
        },
      }}
    >
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/perfil.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="evaluaciones"
        options={{
          tabBarLabel: "Evaluación",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/evaluaciones.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="atletas"
        options={{
          tabBarLabel: "Atletas",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/atleta.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="conexion"
        options={{
          tabBarLabel: "Conexión",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/conexion.png")}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          ),
        }}
      />
  <Tabs.Screen
  name="nuevoAtleta"
  options={{
    href: null,          // 🔥 oculto y sin espacio
    title: "Nuevo Atleta",
  }}
/>



    </Tabs>
  );
}
