import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { MyData } from "../../lib/useAppwrite";
import { AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

const { width: WIDTH_SCREEN } = Dimensions.get("screen");

type TrendingItemProps = {
  activeItem: MyData;
  item: MyData;
};

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      animation={
        activeItem === item
          ? (zoomIn as Animatable.AnimatableAnimationMethods)
          : (zoomOut as Animatable.AnimatableAnimationMethods)
      }
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
          style={styles.video}
        />
      ) : (
        <TouchableOpacity onPress={() => setPlay(true)} activeOpacity={0.7}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <AntDesign
            name="playcircleo"
            size={40}
            color="#fff"
            style={styles.iconPlay}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type TrendingProps = {
  latestPosts: MyData[];
};

export default function Trending({ latestPosts }: TrendingProps) {
  const [activeItem, setActiveItem] = useState<MyData>(latestPosts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <View>
      <FlatList
        data={latestPosts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 18,
    paddingRight: 50,
  },
  thumbnail: {
    width: WIDTH_SCREEN * 0.5,
    height: 260,
    borderRadius: 8,
    resizeMode: "cover",
  },
  iconPlay: {
    position: "absolute",
    alignSelf: "center",
    bottom: 110,
  },
  video: {
    width: WIDTH_SCREEN * 0.5,
    height: 260,
    backgroundColor: "#2b2b38",
    borderRadius: 8,
  },
});
