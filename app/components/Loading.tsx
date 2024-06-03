import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#ffa001" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
