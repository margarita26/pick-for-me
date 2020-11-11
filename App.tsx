import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorReportingProvider } from "./src/context";
import * as Font from "expo-font";
import { SplashScreen } from "expo";
import { Onboarding } from "./src/screens";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Font.loadAsync({
          "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
          "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingComplete(true);
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete ? (
    <ErrorReportingProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Onboarding />
      </SafeAreaProvider>
    </ErrorReportingProvider>
  ) : null;
}
