import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MyData } from "../../lib/useAppwrite";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

type Props = {
  video: MyData;
};

export default function VideoCard({ video }: Props) {
  const [play, setPlay] = useState(false);
  const { avatar, username } = video.creator;
  const { title, thumbnail, video: IVideo } = video;

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.containerImage}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.username} numberOfLines={1}>
            {username}
          </Text>
        </View>
        <Entypo name="dots-three-vertical" size={15} color="gray" />
      </View>
      {play ? (
        <Video
          source={{ uri: IVideo }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
          style={styles.videoCard}
        />
      ) : (
        <TouchableOpacity
          style={styles.containerThumbnail}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
          <AntDesign
            name="playcircleo"
            size={50}
            color="#fff"
            style={styles.iconPlay}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  containerImage: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: "#ffa001",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 4,
  },
  title: {
    fontFamily: "PoppinsMedium",
    color: "#fff",
    fontSize: 13,
  },
  username: {
    fontFamily: "PoppinsBold",
    color: "gray",
    fontSize: 11,
    textTransform: "capitalize",
  },
  containerThumbnail: {
    marginTop: 14,
  },
  thumbnail: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
    borderRadius: 12,
  },
  iconPlay: {
    position: "absolute",
    alignSelf: "center",
    bottom: 80,
  },
  videoCard: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    marginTop: 14,
  },
});
