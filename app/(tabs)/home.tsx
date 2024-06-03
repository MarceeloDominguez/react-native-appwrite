import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import SearchInput from "../components/SearchInput";
import Trending from "../components/Trending";
import EmptyState from "../components/EmptyState";
import useAppwrite, { MyData } from "../../lib/useAppwrite";
import VideoCard from "../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import Loading from "../components/Loading";

type HeaderComponentProps = {
  latestPosts: MyData[];
  username: string;
};

const HeaderComponent = ({ latestPosts, username }: HeaderComponentProps) => {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.titleHeader}>Welcome Back</Text>
      <Text style={styles.subtitleHeader}>{username}</Text>
      <SearchInput
        placeholder="Search for a video topic"
        containerStyles={styles.containerStylesInput}
      />
      <View>
        <Text style={styles.titleCarousel}>Latest Videos</Text>
        <Trending latestPosts={latestPosts} />
      </View>
    </View>
  );
};

export default function Home() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  if (isLoading) return <Loading />;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <HeaderComponent
            latestPosts={latestPosts}
            username={user?.username}
          />
        )}
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
    textTransform: "capitalize",
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
