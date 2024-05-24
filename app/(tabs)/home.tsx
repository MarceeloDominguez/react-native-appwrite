import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts, signOut } from "../../lib/appwrite";
import { router } from "expo-router";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../components/VideoCard";

const HeaderComponent = () => {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.titleHeader}>Welcome Back</Text>
      <Text style={styles.subtitleHeader}>Marcelo Dominguez</Text>
      {/* <SearchInput
        placeholder="Search for a video topic"
        containerStyles={{ marginBottom: 20 }}
      /> */}
      <View>
        <Text
          style={{ color: "gray", fontFamily: "PoppinsMedium", fontSize: 14 }}
        >
          Latest Videos
        </Text>
        <Trending />
      </View>
    </View>
  );
};

//posts ?? [] trending

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);

  if (isLoading)
    return (
      <View style={{ backgroundColor: "orange", flex: 1 }}>
        <Text style={{ color: "red" }}>Loading...</Text>
      </View>
    );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // const handleSignOut = () => {
  //   signOut();
  //   router.replace("/");
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Sign Out" onPress={handleSignOut} /> */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => HeaderComponent()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
});
