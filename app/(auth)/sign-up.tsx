import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress,
        password,
      });

      // If Clerk immediately creates a session (email verification OFF)
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)/dashboard");
      }
    } catch (err: any) {
      console.log("Signup error:", err);
      Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Create your account
      </Text>

      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#eee",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{
          backgroundColor: "#eee",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={onSignUpPress}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>Already have an account? </Text>
        <Link href="/(auth)/sign-in">
          <Text style={{ fontWeight: "bold" }}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
