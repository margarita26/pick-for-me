import styled from "@emotion/native";
import ViewPager from "@react-native-community/viewpager";
import React, { useContext, useRef } from "react";
import { View } from "react-native";
import { Footer, Page } from "../components";
import { colors, ionicsIcons, ONBOARDING_COMPLETE } from "../constants";
import { AppSettingsContext } from "../context/app-settings";

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
    const { setSettings } = useContext(AppSettingsContext);

    const handlePageChange = (pageNumber: number) => {
        pagerRef.current.setPage(pageNumber);
    };

    return (
        <StyledContainer>
            <StyledViewPager initialPage={0} ref={pagerRef}>
                <View key="1">
                    <Page
                        backgroundColor={colors.main}
                        iconName={ionicsIcons.wine}
                        title="Welcome to the restaurant picker app!"
                        geoToggle={false}
                    />
                    <Footer
                        leftButtonLabel={null}
                        leftButtonPress={() => handlePageChange(0)}
                        rightButtonLabel={buttons.next}
                        rightButtonPress={() => handlePageChange(1)}
                    />
                </View>
                <View key="2">
                    <Page
                        backgroundColor={colors.main}
                        iconName={ionicsIcons.search}
                        title="Tell us what you feel like getting along with your budget and get an instant recommendation"
                        geoToggle={false}
                    />
                    <Footer
                        leftButtonLabel={buttons.back}
                        leftButtonPress={() => handlePageChange(0)}
                        rightButtonLabel={buttons.next}
                        rightButtonPress={() => handlePageChange(2)}
                    />
                </View>
                <View key="3">
                    <Page
                        backgroundColor={colors.main}
                        iconName={ionicsIcons.geoPin}
                        title="Allow to share geolocation with us so we show our pick that is close to where you are ;)"
                        geoToggle={true}
                    />
                    <Footer
                        leftButtonLabel={buttons.back}
                        leftButtonPress={() => handlePageChange(1)}
                        rightButtonLabel={buttons.continue}
                        rightButtonPress={() => setSettings(ONBOARDING_COMPLETE, JSON.stringify(true))}
                    />
                </View>
            </StyledViewPager>
        </StyledContainer>
    );
};
