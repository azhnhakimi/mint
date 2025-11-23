import { useAuth, useSignIn } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#101D22",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10, color: "#ffffff" }}>Loading...</Text>
      </View>
    );
  }

  const onSignInPress = async () => {
    setLoading(true);

    if (identifier.trim() === "") {
      showMessage({
        message: "Error",
        description: "Username or email is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      setLoading(false);
      return;
    }

    if (password.trim() === "") {
      showMessage({
        message: "Error",
        description: "Password is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      setLoading(false);
      return;
    }

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
      showMessage({
        message: "Error",
        description: err.errors?.[0]?.message || "Invalid credentials.",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#101D22",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#ffffff",
        }}
      >
        Sign In
      </Text>

      {/* IDENTIFIER */}
      <TextInput
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        placeholder="Username or Email"
        placeholderTextColor={"#8796A9"}
        style={{
          backgroundColor: "#1E2C33",
          padding: 15,
          borderWidth: 1,
          borderColor: "#394353",
          borderRadius: 6,
          marginBottom: 10,
          color: "#ffffff",
        }}
      />

      {/* PASSWORD FIELD WITH SHOW/HIDE */}
      <View
        style={{
          backgroundColor: "#1E2C33",
          borderWidth: 1,
          borderColor: "#394353",
          borderRadius: 6,
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
          placeholderTextColor={"#8796A9"}
          style={{
            flex: 1,
            padding: 15,
            color: "#ffffff",
          }}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontWeight: "600", color: "#ffffff" }}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={!loading ? onSignInPress : undefined}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#8796A9" : "#11A4D4",
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
        <Text style={{ color: "#ffffff" }}>Don't have an account? </Text>
        <Link href="/(auth)/sign-up">
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
