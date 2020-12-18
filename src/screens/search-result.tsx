import { useQuery } from "@apollo/client";
import styled from "@emotion/native";
import { RouteProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useContext, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BusinessContainer } from "../components/BusinessContainer";
import { colors } from "../constants";
import { screens } from "../constants/screens";
import { AppSettingsContext } from "../context/app-settings";
import { ErrorReportingContext } from "../context/error-reporting";
import { GET_YELP_DATA } from "../context/graphql";
import { SearchResultData } from "../models";
import { RootStackParamList } from "../navigation";

type SearchResultRouteParams = RouteProp<RootStackParamList, screens.searchResult>;

type Props = {
    route: SearchResultRouteParams;
};

type SearchRequestVars = {
    request: string;
    price: string;
    latitude: number | undefined;
    longitude: number | undefined;
    limit: number;
};

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${colors.main};
`;

const StyleLottieAnimationContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const SearchResult: React.FC<Props> = ({ route }) => {
    const { request, starRating, numberOfBusinesses } = route.params;
    const { recordError } = useContext(ErrorReportingContext);
    const { userLocation } = useContext(AppSettingsContext);

    const latitude = userLocation?.latitude;
    const longitude = userLocation?.longitude;

    const price = starRating.toString();
    const limit = numberOfBusinesses;

    const { loading, error, data } = useQuery<SearchResultData, SearchRequestVars>(GET_YELP_DATA, {
        fetchPolicy: "cache-first",
        variables: {
            request: request,
            price: price,
            latitude: latitude,
            longitude: longitude,
            limit: limit,
        },
    });

    if (error) {
        recordError(error);
    }

    return (
        <StyledContainer>
            {loading ? (
                <StyleLottieAnimationContainer>
                    <LottieView source={require("../assets/31454-food-prepared-food-app.json")} autoPlay loop />
                </StyleLottieAnimationContainer>
            ) : data?.search.business.length == 0 || error ? (
                <StyleLottieAnimationContainer>
                    <LottieView source={require("../assets/not-found.json")} autoPlay loop />
                </StyleLottieAnimationContainer>
            ) : (
                <FlatList
                    data={data?.search.business}
                    renderItem={({ item }) => <BusinessContainer business={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => <View style={{ paddingVertical: 16 }} />}
                />
            )}
        </StyledContainer>
    );
};
