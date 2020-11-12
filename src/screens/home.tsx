import styled from "@emotion/native";
import React, { useContext, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import StarRating from "react-native-star-rating";
import { RoundedButton } from "../components";
import { SearchBoxField } from "../components/SearchBoxField";
import { colors, fontfamilies, fontSizes } from "../constants";
import { fontAwesomeIcons } from "../constants/icons";
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
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
`;

const StyledInnerContainer = styled.View`
    margin: 8px;
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StyledText = styled.Text`
    font-size: ${fontSizes.regular};
    font-family: ${fontfamilies.ptSerif};
    color: ${colors.white};
`;

export const Home: React.FC = () => {
    const [starCount, setStarCount] = useState<number>(2);
    const { clearAll } = useContext(AppSettingsContext);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <StyledSafeAreaContainer flex={1} color={colors.white}>
                <StyledContainer>
                    <StyledInnerContainer>
                        <SearchBoxField placeholder={"What are you looking for?"} />
                    </StyledInnerContainer>
                    <StyledInnerContainer>
                        <StarRating
                            disabled={false}
                            iconSet={"FontAwesome"}
                            fullStar={fontAwesomeIcons.dollar}
                            emptyStar={fontAwesomeIcons.dollar}
                            fullStarColor={colors.white}
                            emptyStarColor={colors.main}
                            maxStars={5}
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
                <StyledFooterContainer>
                    <RoundedButton
                        label={"Submit"}
                        fontSize={fontSizes.heading}
                        fontColor={colors.main}
                        onPress={() => Alert.alert("pressed")}
                    />
                </StyledFooterContainer>
                {/* <StyledFooterContainer>
                    <RoundedButton label={"Clear"} fontSize={fontSizes.heading} fontColor={colors.main} onPress={() => clearAll()} />
                </StyledFooterContainer> */}
            </StyledSafeAreaContainer>
        </TouchableWithoutFeedback>
    );
};
