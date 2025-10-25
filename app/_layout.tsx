import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { CartProvider } from "@/context/CartContext";

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide splash once fonts (and other resources) are ready
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Don’t render navigation until fonts are ready
  if (!loaded && !error) {
    return null;
  }

  return (
    <CartProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" /> {/* This is your Splash entry */}
          <Stack.Screen name="onboardingscreen" />
          <Stack.Screen name="getstarted" />
          <Stack.Screen name="registerscreen" />
          <Stack.Screen name="verifyaccount" />
          <Stack.Screen name="loginscreen" />
          <Stack.Screen name="setnewpassword" />
          <Stack.Screen name="forgetpassword" />
          <Stack.Screen name="recoverpassword" />
          <Stack.Screen name="verifycode" />
          <Stack.Screen name="productdetails" />
          <Stack.Screen name="tab" />
          <Stack.Screen name="addcart" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
  );
}
