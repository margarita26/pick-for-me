import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { color } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./src/constants";
import { AppSettingsProvider, ErrorReportingProvider } from "./src/context";
import { AppNavigator } from "./src/navigation";
import * as Sentry from 'sentry-expo';

const token =
    "HPId9afj0nWsz3oWPi8U16Rq5BDB9CsMuh5LeQsmD3qzoKkYhgGn_V1b1u3SHUe69jqu0P14sydfRb50nLD7uvZUfXl0hZO97flo0D2ds_5W4aKWLdvvlT_bTymrX3Yx";

const client = new ApolloClient({
    uri: "https://api.yelp.com/v3/graphql",
    headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en_US",
    },
    cache: new InMemoryCache(),
});

export default function App() {
    const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

    

    useEffect(() => {

        Sentry.init({
            dsn: 'https://9cd1ffe3d8004f6797cf7978896d361b@o493619.ingest.sentry.io/5563343',
            enableInExpoDevelopment: true,
            debug: true,
          });

        const loadResourcesAndDataAsync = async () => {
            try {
                await Font.loadAsync({
                    PTSerif: require("./src/assets/fonts/PTSerif-Regular.ttf"),
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
            <ApolloProvider client={client}>
                <AppSettingsProvider>
                    <SafeAreaProvider>
                        <StatusBar style="dark" />
                        <AppNavigator />
                    </SafeAreaProvider>
                </AppSettingsProvider>
            </ApolloProvider>
        </ErrorReportingProvider>
    ) : null;
}
