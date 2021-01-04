import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TitleImage } from "../components";
import { HeaderButton } from "../components/HeaderButton";
import { screens } from "../constants";
import { colors } from "../constants/colors";
import { Business } from "../models";
import { Home, SearchResult } from "../screens";
import { BusinessScreen } from "../screens/business-details-screen";

const TabNavigator = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Home: undefined;
    SearchResult: { request: string; starRating: string; orderBy: string; numberOfBusinesses: number };
    BusinessScreen: { business: Business | undefined };
};

export const HomeNavigator: React.FC = () => {
    return (
        <TabNavigator.Navigator>
            <TabNavigator.Screen name={screens.home} component={Home} options={{ headerTitle: (props) => <TitleImage /> }} />
            <TabNavigator.Screen
                name={screens.searchResult}
                component={SearchResult}
                options={{
                    headerTitle: () => <TitleImage />,
                    headerTintColor: colors.main,
                    headerBackTitle: " ",
                }}
                initialParams={{ request: "", starRating: "2", orderBy: "distance", numberOfBusinesses: 1 }}
            />
            <TabNavigator.Screen
                name={screens.businessScreen}
                component={BusinessScreen}
                initialParams={{ business: undefined }}
                options={{
                    headerTintColor: colors.main,
                    headerTitle: () => <TitleImage />,
                    headerBackTitle: " ",
                }}
            />
        </TabNavigator.Navigator>
    );
};
