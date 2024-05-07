import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";

type Props = {
  label: string;
  value: string;
  handleChangeText: (value: string) => void;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  containerStyles?: ViewStyle;
};

export default function FormField({
  label,
  placeholder,
  value,
  handleChangeText,
  keyboardType,
  secureTextEntry = false,
  containerStyles,
}: Props) {
  return (
    <View style={StyleSheet.flatten([containerStyles])}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          style={styles.textInput}
          value={value}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
    fontSize: 13,
  },
  textInput: {
    backgroundColor: "#1e1e27",
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 4,
    color: "#fff",
    fontFamily: "PoppinsMedium",
  },
});
