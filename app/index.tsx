import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";
import Loading from "./components/Loading";

const { height: HEIGHT_SCREEN } = Dimensions.get("screen");

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <Image
            source={require("../assets/images/onboarding.png")}
            style={styles.image}
          />
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              Discover Endless Possibilities with{" "}
              <Text style={styles.colorTitle}>Aora</Text>
            </Text>
            <Image
              source={require("../assets/images/path.png")}
              style={styles.imagepath}
            />
          </View>
          <Text style={styles.description}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
        </View>
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles={{ margin: 16, marginBottom: 50 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: HEIGHT_SCREEN * 0.4,
    resizeMode: "contain",
    marginTop: 30,
  },
  containerTitle: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "PoppinsBold",
    textAlign: "center",
  },
  imagepath: {
    width: 120,
    height: 15,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: 30,
  },
  description: {
    color: "#cdcde0",
    textAlign: "center",
    paddingHorizontal: 16,
    fontFamily: "PoppinsMedium",
    marginTop: 20,
    fontSize: 13,
  },
  colorTitle: {
    color: "#ffa001",
  },
});
