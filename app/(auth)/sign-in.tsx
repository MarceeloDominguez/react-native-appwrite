import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Sign in to Aora</Text>
        <FormField
          label="Email"
          placeholder="email@gmail.com"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
          containerStyles={{ marginVertical: 15 }}
        />
        <FormField
          label="Password"
          placeholder="********"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          keyboardType="default"
          secureTextEntry={true}
          containerStyles={{ marginVertical: 15 }}
        />
        <CustomButton
          title="Sign In"
          handlePress={onSubmit}
          isLoading={isSubmitting}
          containerStyles={{ marginTop: 50 }}
        />
        <View style={styles.contentNavigation}>
          <Text style={styles.textNavigation}>Don't have account?</Text>
          <Link href="/sign-up" style={styles.linkNavigation}>
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
    padding: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  title: {
    color: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginVertical: 10,
  },
  contentNavigation: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    padding: 16,
  },
  textNavigation: {
    color: "#fff",
    fontFamily: "PoppinsMedium",
  },
  linkNavigation: {
    color: "#ffa001",
    fontFamily: "PoppinsMedium",
  },
});