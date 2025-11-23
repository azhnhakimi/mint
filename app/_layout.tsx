import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { PortalHost } from "@rn-primitives/portal";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <StatusBar style="light" backgroundColor="#101D22" />
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#101D22" }}>
        <SignedOut>
          <Redirect href="/(auth)/sign-in" />
        </SignedOut>

        <SignedIn>
          <Redirect href="/(tabs)/dashboard" />
        </SignedIn>

        <Slot />
      </SafeAreaProvider>
      <FlashMessage position="top" />
      <PortalHost />
    </ClerkProvider>
  );
}
