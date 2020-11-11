import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useRef } from "react";

const RootStack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const routeNameRef = useRef(null);
  const navigationRef = useRef(null);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName={"Onboarding"}>
        {/* <RootStack.Screen
          name={"Onboarding"}
          component={null}
          options={{
            headerShown: false,
          }}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
