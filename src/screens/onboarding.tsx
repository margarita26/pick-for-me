import styled from "@emotion/native";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View } from "react-native";
import { Footer, Page } from "../components";
import { colors, icons } from "../constants";

const buttons = {
  back: "Back",
  next: "Next",
  continue: "Continue",
};

const StyledViewPager = styled(ViewPager)`
  flex: 1;
`;

const StyledContainer = styled.View`
  flex: 1;
`;

export const Onboarding: React.FC = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <StyledContainer>
      <StyledViewPager initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor={colors.main}
            iconName={icons.wine}
            title="Welcome to the restaurant picker app!"
            geoToggle={false}
          />
          <Footer
            backgroundColor={colors.main}
            leftButtonLabel={null}
            leftButtonPress={() => handlePageChange(0)}
            rightButtonLabel={buttons.next}
            rightButtonPress={() => handlePageChange(1)}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor={colors.main}
            iconName={icons.search}
            title="Tell us what you feel like getting right now and get an instant recommendation"
            geoToggle={false}
          />
          <Footer
            backgroundColor={colors.main}
            leftButtonLabel={buttons.back}
            leftButtonPress={() => handlePageChange(0)}
            rightButtonLabel={buttons.next}
            rightButtonPress={() => handlePageChange(2)}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor={colors.main}
            iconName={icons.geoPin}
            title="Allow to share geolocation with us so we show our pick that is close to where you are ;)"
            geoToggle={true}
          />
          <Footer
            backgroundColor={colors.main}
            leftButtonLabel={buttons.back}
            leftButtonPress={() => handlePageChange(1)}
            rightButtonLabel={buttons.continue}
            rightButtonPress={() => navigation.navigate("Home")}
          />
        </View>
      </StyledViewPager>
    </StyledContainer>
  );
};
