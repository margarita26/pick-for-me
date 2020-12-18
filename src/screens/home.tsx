import styled from "@emotion/native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import StarRating from "react-native-star-rating";
import { Footer, SimpleButton } from "../components";
import { SearchBoxField } from "../components/SearchBoxField";
import { colors, fontfamilies, fontSizes } from "../constants";
import { screens } from "../constants/screens";
import { AppSettingsContext } from "../context/app-settings";
import { ErrorReportingContext } from "../context/error-reporting";
import { useEffect } from "react";
import Select from "react-select";

type StyledSafeAreaViewProps = {
    color: string;
    flex: number;
};

const StyledSafeAreaContainer = styled.SafeAreaView<StyledSafeAreaViewProps>`
    flex: ${(props: StyledSafeAreaViewProps) => props.flex};
    background-color: ${(props: StyledSafeAreaViewProps) => props.color};
`;

const StyledContainer = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    background-color: ${colors.main};
`;

const StyledInnerContainer = styled.View`
    flex: 1;
    margin: 8px;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledInputContainer = styled.View`
    margin-top: 8px;
    height: 70px;
    width: 100%;
`;

const StyledText = styled.Text`
    color: ${colors.white};
    font-family: ${fontfamilies.ptSerif};
`;

export const Home: React.FC = () => {
    const [starCount, setStarCount] = useState<number>(2);
    const [businessCount, setBusinessCount] = useState<number>(1);
    const [searchRequest, setSearchRequest] = useState<string>("");
    const { clearAll } = useContext(AppSettingsContext);
    const { recordError } = useContext(ErrorReportingContext);
    const { userLocation } = useContext(AppSettingsContext);

    const navigation = useNavigation();
    const [autocompleteSuggests, setAutoCompleteSuggest] = useState<any>();

    const handleSubmit = () => {
        navigation.navigate(screens.searchResult, {
            request: searchRequest,
            starRating: starCount,
            numberOfBusinesses: businessCount,
        });
    };

    const getAutocompleteSuggestions = async () => {
        console.log(searchRequest);
        const token =
            "HPId9afj0nWsz3oWPi8U16Rq5BDB9CsMuh5LeQsmD3qzoKkYhgGn_V1b1u3SHUe69jqu0P14sydfRb50nLD7uvZUfXl0hZO97flo0D2ds_5W4aKWLdvvlT_bTymrX3Yx";

        await fetch(
            `https://api.yelp.com/v3/autocomplete?text=${searchRequest}&latitude=${userLocation?.latitude}&longitude=${userLocation?.longitude}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept-Language": "en_US",
                },
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                setAutoCompleteSuggest(responseJson);
            })
            .catch((error) => {
                recordError(error);
            });
    };

    useEffect(() => {
        if (searchRequest != "") {
            getAutocompleteSuggestions();
        }
    }, [searchRequest]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <StyledSafeAreaContainer flex={1} color={colors.white}>
                <StyledContainer behavior="padding">
                    <StyledInnerContainer>
                        <StyledInputContainer>
                            <SearchBoxField
                                value={searchRequest}
                                onTextChange={setSearchRequest}
                                placeholder={"What are you looking for?"}
                                onSubmit={handleSubmit}
                            />
                        </StyledInputContainer>
                        <StyledInputContainer>
                            <StarRating
                                disabled={false}
                                iconSet={"FontAwesome"}
                                fullStar={"dollar"}
                                emptyStar={"dollar"}
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
                        </StyledInputContainer>
                        <StyledInputContainer>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={1}
                                maximumValue={20}
                                minimumTrackTintColor={colors.white}
                                maximumTrackTintColor={colors.black}
                                onValueChange={(val: number) => setBusinessCount(val)}
                                step={1}
                            />
                        </StyledInputContainer>
                        <StyledText>Number of places to find: {businessCount}</StyledText>
                    </StyledInnerContainer>
                </StyledContainer>
                <Footer
                    backgroundColor={colors.white}
                    fontSize={fontSizes.heading}
                    fontColor={colors.main}
                    leftButtonLabel={null}
                    leftButtonPress={() => null}
                    rightButtonLabel={"Search"}
                    rightButtonPress={handleSubmit}
                />
                {/* <SimpleButton label={"Clear"} fontSize={fontSizes.heading} fontColor={colors.main} onPress={() => clearAll()} /> */}
            </StyledSafeAreaContainer>
        </TouchableWithoutFeedback>
    );
};
