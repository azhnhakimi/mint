import { useSignUp } from "@clerk/clerk-expo";
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

  const onSignUpPress = async () => {
    if (loading) return;

    if (username.trim() === "") {
      showMessage({
        message: "Error",
        description: "Username is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
      return;
    }

    if (emailAddress.trim() === "") {
      showMessage({
        message: "Error",
        description: "Email is required!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
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
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: "Error",
        description: "Passwords do not match!",
        type: "danger",
        statusBarHeight: Constants.statusBarHeight,
        backgroundColor: "#ff0000",
      });
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

      const errorMessage =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.[0]?.longMessage ||
        err?.[0]?.message ||
        err?.message ||
        "Something went wrong during sign-up.";

      showMessage({
        message: "Error",
        description: errorMessage,
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
        Create your account
      </Text>

      {/* USERNAME */}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={"#8796A9"}
        autoCapitalize="none"
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

      {/* EMAIL */}
      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Email"
        placeholderTextColor={"#8796A9"}
        autoCapitalize="none"
        keyboardType="email-address"
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

      {/* PASSWORD */}
      <View
        style={{
          backgroundColor: "#1E2C33",
          borderWidth: 1,
          borderColor: "#394353",
          borderRadius: 6,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 10,
        }}
      >
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={"#8796A9"}
          secureTextEntry={!showPassword}
          style={{
            flex: 1,
            padding: 15,
            color: "#ffffff",
          }}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONFIRM PASSWORD */}
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={"#8796A9"}
          secureTextEntry={!showConfirm}
          style={{
            flex: 1,
            padding: 15,
            color: "#ffffff",
          }}
        />

        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
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
          backgroundColor: loading ? "#8796A9" : "#11A4D4",
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
        <Text style={{ color: "#ffffff" }}>Already have an account? </Text>
        <Link href="/(auth)/sign-in">
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}
