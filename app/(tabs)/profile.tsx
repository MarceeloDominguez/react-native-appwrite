import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../components/EmptyState";
import VideoCard from "../components/VideoCard";
import { MaterialIcons } from "@expo/vector-icons";
import InfoBox from "../components/InfoBox";
import { router } from "expo-router";
import Loading from "../components/Loading";

type PropsHeaderComponent = {
  avatar: string;
  username: string;
  amountPosts: string;
  logout: () => void;
};

const HeaderComponent = ({
  avatar,
  username,
  amountPosts,
  logout,
}: PropsHeaderComponent) => {
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.iconlogout}
        activeOpacity={0.7}
        onPress={logout}
      >
        <MaterialIcons name="logout" size={24} color="#c70039" />
      </TouchableOpacity>
      <View style={styles.containerAvatarHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </View>
      <InfoBox
        title={username}
        containerStyles={{ marginTop: 10 }}
        titleStyles={{ fontFamily: "PoppinsBold", fontSize: 20 }}
      />
      <View style={styles.containerComponentsInfoBox}>
        <InfoBox
          title={amountPosts}
          subtitle="Posts"
          titleStyles={{ fontFamily: "PoppinsMedium" }}
          subtitleStyles={{ fontFamily: "PoppinsMedium", color: "gray" }}
        />
        <InfoBox
          title="1.2k"
          subtitle="Followers"
          titleStyles={{ fontFamily: "PoppinsMedium" }}
          subtitleStyles={{ fontFamily: "PoppinsMedium", color: "gray" }}
        />
      </View>
    </View>
  );
};

export default function Profile() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, isLoading } = useAppwrite(() => getUserPosts(user.$id));

  if (isLoading) return <Loading />;

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <HeaderComponent
            avatar={user?.avatar}
            username={user?.username}
            amountPosts={posts.length.toString() || "0"}
            logout={logout}
          />
        )}
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
    alignItems: "center",
  },
  containerAvatarHeader: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ffa001",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 2,
  },
  iconlogout: {
    alignSelf: "flex-end",
  },
  containerComponentsInfoBox: {
    flexDirection: "row",
    gap: 18,
    padding: 4,
    marginVertical: 10,
  },
});
