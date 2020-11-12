import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useRef } from "react";
import { screens } from "../constants";
import { Home, Onboarding } from "../screens";

const RootStack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const navigationRef = useRef(null);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={screens.onboarding}
        headerMode="none"
      >
        <RootStack.Screen name={screens.onboarding} component={Onboarding} />
        <RootStack.Screen name={screens.home} component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
