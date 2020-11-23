import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Alert, Button } from "react-native";
import { TitleImage } from "../components";
import { screens } from "../constants";
import { Home, SearchResult } from "../screens";
import { colors } from '../constants/colors';
import { color } from "react-native-reanimated";
import { SimpleButton } from '../components/SimpleButton';
import { fontSizes } from '../constants/font-size';
import { fontfamilies } from '../constants/fonts';

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
