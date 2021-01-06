import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View, Text } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import StarRating from "react-native-star-rating";
import { Footer, SimpleButton } from "../components";
import { SearchBoxField } from "../components/SearchBoxField";
import { colors, fontfamilies, fontSizes } from "../constants";
import { screens } from "../constants/screens";
import { AppSettingsContext } from "../context/app-settings";
import { ErrorReportingContext } from "../context/error-reporting";

const sortTypes = ["distance", "recommended", "rating", "most reviewed"];

const StyledSafeAreaContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.white};
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
    margin-top: 16px;
    min-height: 70px;
    width: 100%;
    justify-content: center;
`;

type TextProps = {
    color: string;
    size: string;
};

const StyledText = styled.Text<TextProps>`
    color: ${(props: TextProps) => props.color};
    font-family: ${fontfamilies.ptSerif};
    font-size: ${(props: TextProps) => props.size};
    padding: 4px;
`;

const StyledPickContainer = styled.View`
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.2);
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 4px;
`;

export const Home: React.FC = () => {
    const [starCount, setStarCount] = useState<number>(3);
    const [businessCount, setBusinessCount] = useState<number>(3);
    const [searchRequest, setSearchRequest] = useState<string>("");
    const [itemClicked, setItemClicked] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<string>(sortTypes[0]);
    const [showOrderBy, setShowOrderBy] = useState<boolean>(false);

    const { clearAll } = useContext(AppSettingsContext);
    const { recordError } = useContext(ErrorReportingContext);
    const { userLocation } = useContext(AppSettingsContext);

    const arrNums = Array.from(Array.from({ length: 10 }, (_, i) => i + 1));

    const navigation = useNavigation();
    const [autocompleteSuggests, setAutoCompleteSuggest] = useState<AutocompleteTerms[] | undefined>();

    const handleSubmit = () => {
        navigation.navigate(screens.searchResult, {
            request: searchRequest,
            starRating: starCount,
            orderBy: orderBy,
            numberOfBusinesses: businessCount,
        });
    };

    const getAutocompleteSuggestions = async () => {
        fetch(
            `https://api.yelp.com/v3/autocomplete?text=${searchRequest}&latitude=${userLocation?.latitude}&longitude=${userLocation?.longitude}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Constants.manifest.extra.YELP_API_KEY}`,
                    "Accept-Language": "en_US",
                },
            }
        )
            .then((response) => response.json())
            .then((responseJson: AutocompleteData) => {
                setAutoCompleteSuggest(responseJson.terms);
            })
            .catch((error) => {
                recordError(error);
            });
    };

    useEffect(() => {
        if (searchRequest != "" && !itemClicked) {
            getAutocompleteSuggestions();
        }
    }, [searchRequest]);

    const picks = arrNums.map((item, ind) => {
        return (
            <TouchableOpacity
                key={ind}
                style={{
                    padding: 4,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderColor: item == businessCount ? colors.white : colors.transparent,
                }}
                onPress={() => setBusinessCount(item)}>
                <StyledText color={item == businessCount ? colors.white : colors.main} size={fontSizes.regular}>
                    {item}
                </StyledText>
            </TouchableOpacity>
        );
    });

    const sortBy = sortTypes.map((item, ind) => {
        return (
            <TouchableOpacity
                key={ind}
                onPress={() => {
                    setOrderBy(item);
                }}>
                <StyledText color={item == orderBy ? colors.white : colors.main} size={fontSizes.regular}>
                    {item}
                </StyledText>
            </TouchableOpacity>
        );
    });

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
                setAutoCompleteSuggest(undefined);
            }}>
            <StyledSafeAreaContainer>
                <StyledContainer behavior="padding">
                    <StyledInnerContainer>
                        <View style={{ width: "100%" }}>
                            <Autocomplete
                                containerStyle={{ zIndex: 1 }}
                                listStyle={{
                                    position: "relative",
                                    borderColor: colors.transparent,
                                    borderRadius: 16,
                                    marginTop: 4,
                                    paddingHorizontal: 16,
                                    opacity: 0.7,
                                }}
                                data={searchRequest != "" && autocompleteSuggests ? autocompleteSuggests : []}
                                defaultValue={searchRequest}
                                onChangeText={setSearchRequest}
                                inputContainerStyle={{
                                    borderColor: colors.transparent,
                                }}
                                renderTextInput={() => {
                                    return (
                                        <SearchBoxField
                                            value={searchRequest}
                                            onTextChange={(text) => {
                                                setSearchRequest(text);
                                                setItemClicked(false);
                                            }}
                                            placeholder={"What are you looking for?"}
                                            onSubmit={handleSubmit}
                                        />
                                    );
                                }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ borderColor: colors.white }}
                                        onPress={() => {
                                            setSearchRequest(item.text);
                                            setItemClicked(true);
                                            setAutoCompleteSuggest(undefined);
                                        }}>
                                        <StyledText size={fontSizes.regular} color={colors.black}>
                                            {item.text}
                                        </StyledText>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
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
                            <StyledPickContainer>{picks}</StyledPickContainer>
                        </StyledInputContainer>
                        {showOrderBy ? (
                            <StyledInputContainer style={{ marginBottom: 16 }}>
                                <StyledPickContainer>{sortBy}</StyledPickContainer>
                            </StyledInputContainer>
                        ) : (
                            <StyledInputContainer>
                                <TouchableOpacity
                                    style={{ alignItems: "center", justifyContent: "center" }}
                                    onPress={() => setShowOrderBy(true)}>
                                    <StyledText style={{ opacity: 0.4 }} color={colors.white} size={fontSizes.regular}>
                                        Sort results by
                                    </StyledText>
                                </TouchableOpacity>
                            </StyledInputContainer>
                        )}
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
