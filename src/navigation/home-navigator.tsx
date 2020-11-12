import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TitleImage } from "../components";
import { screens } from "../constants";
import { Home } from "../screens";

const TabNavigator = createStackNavigator();

export const HomeNavigator: React.FC = () => {
    return (
        <TabNavigator.Navigator initialRouteName={screens.home}>
            <TabNavigator.Screen name={screens.home} component={Home} options={{ headerTitle: (props) => <TitleImage /> }} />
        </TabNavigator.Navigator>
    );
};
