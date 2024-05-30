import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  containerStyles?: ViewStyle;
  titleStyles?: TextStyle;
  subtitleStyles?: TextStyle;
};

export default function InfoBox({
  title,
  subtitle,
  containerStyles,
  titleStyles,
  subtitleStyles,
}: Props) {
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyles)]}>
      <Text style={[styles.title, StyleSheet.flatten(titleStyles)]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, StyleSheet.flatten(subtitleStyles)]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
  },
  subtitle: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 13,
  },
});
