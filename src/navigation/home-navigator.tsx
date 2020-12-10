import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TitleImage } from "../components";
import { screens } from "../constants";
import { colors } from "../constants/colors";
import { Home, SearchResult } from "../screens";

const TabNavigator = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Home: undefined;
    SearchResult: { request: string; starRating: string };
};

export const HomeNavigator: React.FC = () => {
    return (
        <TabNavigator.Navigator>
            <TabNavigator.Screen name={screens.home} component={Home} options={{ headerTitle: (props) => <TitleImage /> }} />
            <TabNavigator.Screen
                name={screens.searchResult}
                component={SearchResult}
                options={{
                    headerTitle: (props) => <TitleImage />,
                    headerTintColor: colors.main,
                }}
                initialParams={{ request: "", starRating: "2" }}
            />
        </TabNavigator.Navigator>
    );
};
