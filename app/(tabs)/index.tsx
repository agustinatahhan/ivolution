import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Link href={"/login"} asChild>
        <Pressable>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
}
