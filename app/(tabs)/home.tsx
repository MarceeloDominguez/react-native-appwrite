import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

export default function Home() {
  const handleSignOut = () => {
    signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
}
