import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppSettingsProvider, ErrorReportingProvider } from "./src/context";
import { AppNavigator } from "./src/navigation";

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
