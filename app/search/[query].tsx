import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../components/VideoCard";
import SearchInput from "../components/SearchInput";
import EmptyState from "../components/EmptyState";

const HeaderComponent = ({ query }) => {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.titleHeader}>Search Results</Text>
      <Text style={styles.subtitleHeader}>{query}</Text>
      <SearchInput
        placeholder="Search for a video topic"
        containerStyles={styles.containerStylesInput}
        initialQuery={query}
      />
    </View>
  );
};

export default function Search() {
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  if (isLoading)
    return (
      <View style={{ backgroundColor: "green", flex: 1 }}>
        <Text style={{ color: "red" }}>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => <HeaderComponent query={query} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
    padding: 20,
  },
  containerHeader: {
    marginBottom: 10,
  },
  titleHeader: {
    color: "gray",
    fontFamily: "PoppinsMedium",
    fontSize: 13,
  },
  subtitleHeader: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 24,
  },
  containerStylesInput: {
    marginBottom: 20,
    marginTop: 8,
  },
  titleCarousel: {
    color: "gray",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
