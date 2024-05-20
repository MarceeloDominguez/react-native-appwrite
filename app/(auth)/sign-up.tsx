import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.name);

      //set it to global state

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Sign up to Aora</Text>
        <FormField
          label="Name"
          placeholder="you name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
          keyboardType="default"
          containerStyles={{ marginVertical: 15 }}
        />
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
          title="Sign Up"
          handlePress={onSubmit}
          isLoading={isSubmitting}
          containerStyles={{ marginTop: 50 }}
        />
        <View style={styles.contentNavigation}>
          <Text style={styles.textNavigation}>Have an account already?</Text>
          <Link href="/sign-in" style={styles.linkNavigation}>
            Sign in
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
