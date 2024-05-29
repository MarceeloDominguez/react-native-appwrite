import {
  View,
  StyleSheet,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  containerStyles?: ViewStyle;
  initialQuery?: string;
};

export default function SearchInput({
  placeholder,
  secureTextEntry = false,
  containerStyles,
  initialQuery,
}: Props) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View style={StyleSheet.flatten([containerStyles])}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        style={styles.textInput}
        value={query}
        onChangeText={(e) => setQuery(e)}
        keyboardType="default"
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity
        style={styles.containerIconSearch}
        activeOpacity={0.7}
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across detabase"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Feather name="search" size={25} color="#7b7b8b" />
      </TouchableOpacity>
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
    color: "#fff",
    fontFamily: "PoppinsMedium",
    paddingRight: 50,
  },
  containerIconSearch: {
    height: 45,
    width: 45,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    borderRadius: 6,
  },
});
