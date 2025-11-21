import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <SafeAreaProvider>
        <SignedOut>
          <Redirect href="/(auth)/sign-in" />
        </SignedOut>

        <SignedIn>
          <Redirect href="/(tabs)/dashboard" />
        </SignedIn>

        <Slot />
      </SafeAreaProvider>
      <FlashMessage position="top" />
    </ClerkProvider>
  );
}
