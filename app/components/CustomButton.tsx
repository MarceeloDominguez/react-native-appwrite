import {
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native";
import React from "react";

type Props = {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle;
  titleStyles?: TextStyle;
  isLoading?: boolean;
};

export default function CustomButton({
  title,
  handlePress,
  containerStyles,
  titleStyles,
  isLoading,
}: Props) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={StyleSheet.flatten([styles.button, containerStyles])}
    >
      <Text style={StyleSheet.flatten([styles.titleButton, titleStyles])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffa001",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  titleButton: {
    fontFamily: "PoppinsBold",
  },
});
