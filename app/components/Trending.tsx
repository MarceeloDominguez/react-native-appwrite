import { View, Text, FlatList } from "react-native";
import React from "react";

export default function Trending() {
  return (
    <View>
      <FlatList
        data={[...Array(3)]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({}) => <Text>Hola De Nuevo</Text>}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
