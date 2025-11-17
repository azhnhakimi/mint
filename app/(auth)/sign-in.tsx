import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in is complete, Clerk creates a session
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)/dashboard");
      }
    } catch (err: any) {
      console.log("SignIn Error:", err);
      Alert.alert("Error", err.errors?.[0]?.message || "Invalid credentials.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Sign In
      </Text>

      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
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
        secureTextEntry
        placeholder="Password"
        style={{
          backgroundColor: "#eee",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={onSignInPress}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
          Continue
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>Don't have an account? </Text>
        <Link href="/(auth)/sign-up">
          <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
