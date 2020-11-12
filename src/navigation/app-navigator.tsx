import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useRef } from "react";
import { screens } from "../constants";
import { AppSettingsContext } from "../context/app-settings";
import { Onboarding } from "../screens";
import { HomeNavigator } from "./home-navigator";
import { keys } from "../constants/storage-keys";

const RootStack = createStackNavigator();

export const AppNavigator: React.FC = () => {
    const navigationRef = useRef(null);
    const { isOnbordingCompleted } = useContext(AppSettingsContext);

    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator initialRouteName={screens.onboarding} headerMode="none">
                {isOnbordingCompleted ? (
                    <RootStack.Screen name={screens.homeNavigator} component={HomeNavigator} />
                ) : (
                    <RootStack.Screen name={screens.onboarding} component={Onboarding} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
