import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { Video, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function Create() {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type:
    //     selectType === "image"
    //       ? ["image/png", "image/jpg", "image/jpeg"]
    //       : ["video/mp4", "video/gif"],
    // });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Upload Video</Text>
        <FormField
          label="Video Title"
          placeholder="Give your video a catch title..."
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          keyboardType="default"
          containerStyles={{ marginTop: 20 }}
        />
        <View style={styles.contentUploadVideo}>
          <Text style={styles.titleCardUploadVideo}>Upload Video</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("video")}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.COVER}
                style={{ width: "100%", height: 120, borderRadius: 6 }}
              />
            ) : (
              <View style={styles.cardUploadVideo}>
                <View style={styles.containerIconUploadVideo}>
                  <Feather name="upload" size={24} color="#ffa001" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.contentUploadThumbnail}>
          <Text style={styles.titleCardUploadThumbnail}>Thumbnail Image</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                style={{ width: "100%", height: 120, borderRadius: 6 }}
              />
            ) : (
              <View style={styles.cardUploadThumbnail}>
                <Feather name="upload" size={15} color="#ffa001" />
                <Text style={styles.textCardUploadThumbnail}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          placeholder="The prompt you used to create this video"
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          keyboardType="default"
          containerStyles={{ marginTop: 20 }}
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={{ marginTop: 40 }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 18,
  },
  contentUploadVideo: {
    marginTop: 20,
  },
  titleCardUploadVideo: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
    fontSize: 13,
    marginBottom: 4,
  },
  cardUploadVideo: {
    backgroundColor: "#1e1e27",
    height: 120,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  containerIconUploadVideo: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ffa001",
  },
  contentUploadThumbnail: {
    marginTop: 20,
  },
  titleCardUploadThumbnail: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
    fontSize: 13,
    marginBottom: 4,
  },
  cardUploadThumbnail: {
    backgroundColor: "#1e1e27",
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  textCardUploadThumbnail: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    top: 1,
  },
});
