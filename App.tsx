import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorReportingProvider } from "./src/context";
import { AppNavigator } from "./src/navigation";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Font.loadAsync({
          "PTSerif": require("./src/assets/fonts/PTSerif-Regular.ttf"),
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
        <AppNavigator />
      </SafeAreaProvider>
    </ErrorReportingProvider>
  ) : null;
}
