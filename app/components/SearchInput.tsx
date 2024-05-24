import {
  View,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
  TextInput,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type Props = {
  label: string;
  value: string;
  handleChangeText: (value: string) => void;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  containerStyles?: ViewStyle;
};

export default function SearchInput({
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
        <Feather
          name="search"
          size={25}
          color="#7b7b8b"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
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
    paddingRight: 50,
  },
});
