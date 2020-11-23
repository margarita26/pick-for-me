import { useQuery } from "@apollo/client";
import styled from "@emotion/native";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { colors } from "../constants";
import { screens } from "../constants/screens";
import { AppSettingsContext } from "../context/app-settings";
import { ErrorReportingContext } from "../context/error-reporting";
import { GET_YELP_DATA } from "../context/graphql";
import { RootStackParamList } from "../navigation";

type SearchResultRouteParams = RouteProp<RootStackParamList, screens.searchResult>;

type Props = {
    route: SearchResultRouteParams;
};

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${colors.main};
`;

export const SearchResult: React.FC<Props> = ({ route }) => {
    const { request, starRating } = route.params;
    const { recordError } = useContext(ErrorReportingContext);
    const { userLocation } = useContext(AppSettingsContext);
    const [showAnimation, setShowAnimation] = useState<boolean>(true);
    const latitude = userLocation?.latitude;
    const longitude = userLocation?.longitude;

    const price = starRating.toString();
    const limit = 3;
    const radius = 1700;

    const { loading, error, data } = useQuery(GET_YELP_DATA, {
        variables: {
            request,
            price,
            latitude,
            longitude,
            limit,
            radius,
        },
    });

    useFocusEffect(
        React.useCallback(() => {
            setShowAnimation(true);
            const timer = setTimeout(() => setShowAnimation(false), 2000);
            return () => {
                setShowAnimation(true);
                clearTimeout(timer);
            };
        }, [request])
    );

    if (error) {
        recordError(error);
    }

    return (
        <StyledContainer>
            {showAnimation || loading || data == undefined ? (
                <LottieView source={require("../assets/31454-food-prepared-food-app.json")} autoPlay loop />
            ) : (
                <Text>""</Text>
            )}
        </StyledContainer>
    );
};
