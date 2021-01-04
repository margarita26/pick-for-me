import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "sentry-expo";
import { AppSettingsProvider, ErrorReportingProvider } from "./src/context";
import { AppNavigator } from "./src/navigation";
import Constants from 'expo-constants';

const client = new ApolloClient({
    uri: "https://api.yelp.com/v3/graphql",
    headers: {
        Authorization: `Bearer ${Constants.manifest.extra.YELP_API_KEY}`,
        "Accept-Language": "en_US",
    },
    cache: new InMemoryCache(),
});

Sentry.init({
    dsn: "https://9cd1ffe3d8004f6797cf7978896d361b@o493619.ingest.sentry.io/5563343",
    enableInExpoDevelopment: false,
    debug: true,
});

export default function App() {
    const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

    useEffect(() => {
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
