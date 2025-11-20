import { ClerkProvider, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Redirect, Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaProvider>
        {/* <SignedOut>
          <Redirect href="/(auth)/sign-in" />
        </SignedOut> */}

        <SignedOut>
          <Redirect href="/(tabs)/dashboard" />
        </SignedOut>

        <Slot />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
