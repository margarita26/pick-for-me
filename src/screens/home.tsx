import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import StarRating from "react-native-star-rating";
import { Footer, SimpleButton } from "../components";
import { SearchBoxField } from "../components/SearchBoxField";
import { colors, fontSizes } from "../constants";
import { fontAwesomeIcons, iconFamilies } from "../constants/icons";
import { screens } from "../constants/screens";
import { AppSettingsContext } from "../context/app-settings";

type StyledSafeAreaViewProps = {
    color: string;
    flex: number;
};

const StyledSafeAreaContainer = styled.SafeAreaView<StyledSafeAreaViewProps>`
    flex: ${(props: StyledSafeAreaViewProps) => props.flex};
    background-color: ${(props: StyledSafeAreaViewProps) => props.color};
`;

const StyledContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: ${colors.main};
    padding-top: 64px;
`;

const StyledFooterContainer = styled.View`
    height: 8%;
    background-color: ${colors.white};
`;

const StyledInnerContainer = styled.View`
    margin: 8px;
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Home: React.FC = () => {
    const [starCount, setStarCount] = useState<number>(2);
    const [searchRequest, setSearchRequest] = useState<string>("");
    const { clearAll } = useContext(AppSettingsContext);
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <StyledSafeAreaContainer flex={1} color={colors.white}>
                <StyledContainer>
                    <StyledInnerContainer>
                        <SearchBoxField value={searchRequest} onTextChange={setSearchRequest} placeholder={"What are you looking for?"} />
                    </StyledInnerContainer>
                    <StyledInnerContainer>
                        <StarRating
                            disabled={false}
                            iconSet={iconFamilies.fontAwesome}
                            fullStar={fontAwesomeIcons.dollar}
                            emptyStar={fontAwesomeIcons.dollar}
                            fullStarColor={colors.white}
                            emptyStarColor={colors.main}
                            maxStars={4}
                            rating={starCount}
                            starSize={40}
                            containerStyle={{
                                flex: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                borderRadius: 16,
                            }}
                            starStyle={{ padding: 16 }}
                            selectedStar={(rating: number) => setStarCount(rating)}
                        />
                    </StyledInnerContainer>
                </StyledContainer>
                <Footer
                    backgroundColor={colors.white}
                    fontSize={fontSizes.heading}
                    fontColor={colors.main}
                    leftButtonLabel={null}
                    leftButtonPress={() => null}
                    rightButtonLabel={"Search"}
                    rightButtonPress={() => navigation.navigate(screens.searchResult, { request: searchRequest, starRating: starCount })}
                />
                <StyledFooterContainer>
                    <SimpleButton label={"Clear"} fontSize={fontSizes.heading} fontColor={colors.main} onPress={() => clearAll()} />
                </StyledFooterContainer>
            </StyledSafeAreaContainer>
        </TouchableWithoutFeedback>
    );
};
