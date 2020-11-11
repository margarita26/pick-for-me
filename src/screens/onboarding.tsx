import styled from "@emotion/native";
import ViewPager from "@react-native-community/viewpager";
import React from "react";
import { View } from "react-native";
import { color } from "react-native-reanimated";
import { Page, Footer } from "../components";
import { colors } from "../constants";

const StyledViewPager = styled(ViewPager)`
  flex: 1;
`;

const StyledContainer = styled.View`
  flex: 1;
`;

export const Onboarding: React.FC = () => {
  return (
    <StyledContainer>
      <StyledViewPager>
        <View key="1">
          <Page
            backgroundColor={colors.main}
            iconName="drink"
            title="Welcome to the restaurant picker app!"
          />
          <Footer
            backgroundColor={colors.main}
            rightButtonLabel="Next"
            rightButtonPress={() => true}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor={colors.main}
            iconName="list"
            title="Tell us what you feel like getting today"
          />
          <Footer
            backgroundColor={colors.main}
            rightButtonLabel="Next"
            rightButtonPress={() => true}
          />
        </View>
      </StyledViewPager>
    </StyledContainer>
  );
};
