import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const { isLoaded: authIsLoaded } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!authIsLoaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  const onSignInPress = async () => {
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)/dashboard");
      }
    } catch (err: any) {
      console.log("SignIn Error:", err);
      Alert.alert("Error", err.errors?.[0]?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Sign In
      </Text>

      {/* IDENTIFIER */}
      <TextInput
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        placeholder="Username or Email"
        style={{
          backgroundColor: "#eee",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* PASSWORD FIELD WITH SHOW/HIDE */}
      <View
        style={{
          backgroundColor: "#eee",
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 10,
        }}
      >
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="Password"
          style={{
            flex: 1,
            padding: 15,
          }}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontWeight: "600" }}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={!loading ? onSignInPress : undefined}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#555" : "black",
          opacity: loading ? 0.6 : 1,
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
            Continue
          </Text>
        )}
      </TouchableOpacity>

      {/* SIGN UP LINK */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>Don't have an account? </Text>
        <Link href="/(auth)/sign-up">
          <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
