import { useSignUp } from "@clerk/clerk-expo";
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  const onSignUpPress = async () => {
    if (loading) return;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.create({
        username,
        emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)/dashboard");
      }
    } catch (err: any) {
      console.log("Signup error:", err);
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Something went wrong during sign-up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Create your account
      </Text>

      {/* USERNAME */}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
        style={{
          backgroundColor: "#eee",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* EMAIL */}
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

      {/* PASSWORD */}
      <View
        style={{
          position: "relative",
          marginBottom: 10,
        }}
      >
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={{
            backgroundColor: "#eee",
            padding: 15,
            borderRadius: 10,
            paddingRight: 50,
          }}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 15,
            top: 18,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
      <View style={{ position: "relative", marginBottom: 5 }}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirm}
          style={{
            backgroundColor: "#eee",
            padding: 15,
            borderRadius: 10,
            paddingRight: 50,
          }}
        />

        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={{
            position: "absolute",
            right: 15,
            top: 18,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {showConfirm ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* PASSWORD MISMATCH WARNING */}
      {password.length > 0 &&
        confirmPassword.length > 0 &&
        password !== confirmPassword && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            Passwords do not match
          </Text>
        )}

      {/* SIGN UP BUTTON */}
      <TouchableOpacity
        onPress={!loading ? onSignUpPress : undefined}
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
          marginTop: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
            Sign Up
          </Text>
        )}
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
