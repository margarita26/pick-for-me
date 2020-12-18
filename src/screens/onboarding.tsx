import styled from "@emotion/native";
import ViewPager from "@react-native-community/viewpager";
import React, { useContext, useRef } from "react";
import { View } from "react-native";
import { Footer, Page } from "../components";
import { colors, ONBOARDING_COMPLETE } from "../constants";
import { fontSizes } from "../constants/font-size";
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
                        iconName={"ios-wine"}
                        title="Welcome to the restaurant picker app!"
                        geoToggle={false}
                    />
                    <Footer
                        backgroundColor={colors.main}
                        fontSize={fontSizes.regular}
                        fontColor={colors.white}
                        leftButtonLabel={null}
                        leftButtonPress={() => null}
                        rightButtonLabel={buttons.next}
                        rightButtonPress={() => handlePageChange(1)}
                    />
                </View>
                <View key="2">
                    <Page
                        backgroundColor={colors.main}
                        iconName={"ios-search"}
                        title="Tell us what you feel like getting along with your budget and get an instant recommendation"
                        geoToggle={false}
                    />
                    <Footer
                        backgroundColor={colors.main}
                        fontSize={fontSizes.regular}
                        fontColor={colors.white}
                        leftButtonLabel={buttons.back}
                        leftButtonPress={() => handlePageChange(0)}
                        rightButtonLabel={buttons.next}
                        rightButtonPress={() => handlePageChange(2)}
                    />
                </View>
                <View key="3">
                    <Page
                        backgroundColor={colors.main}
                        iconName={"md-pin"}
                        title="Allow to share geolocation with us so we show our pick that is close to where you are ;)"
                        geoToggle={true}
                    />
                    <Footer
                        backgroundColor={colors.main}
                        fontSize={fontSizes.regular}
                        fontColor={colors.white}
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
