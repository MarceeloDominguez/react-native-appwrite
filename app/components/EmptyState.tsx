import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: Props) {
  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/empty.png")}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <CustomButton
        title="Back to explore"
        handlePress={() => router.push("/create")}
        containerStyles={{ marginVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 270,
    height: 215,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 20,
  },
  subtitle: {
    color: "gray",
    fontFamily: "PoppinsMedium",
    fontSize: 13,
    textAlign: "center",
  },
});
