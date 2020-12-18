import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TitleImage } from "../components";
import { HeaderButton } from "../components/HeaderButton";
import { screens } from "../constants";
import { colors } from "../constants/colors";
import { Home, SearchResult } from "../screens";

const TabNavigator = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Home: undefined;
    SearchResult: { request: string; starRating: string; numberOfBusinesses: number };
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
                    headerRight: () => <HeaderButton />,
                }}
                initialParams={{ request: "", starRating: "2", numberOfBusinesses: 1 }}
            />
        </TabNavigator.Navigator>
    );
};
