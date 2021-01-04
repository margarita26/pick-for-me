import { useQuery } from "@apollo/client";
import styled from "@emotion/native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
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
    sort_by: string;
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
    const { request, starRating, orderBy, numberOfBusinesses } = route.params;
    const { recordError } = useContext(ErrorReportingContext);
    const { userLocation } = useContext(AppSettingsContext);
    const navigation = useNavigation();

    const latitude = userLocation?.latitude;
    const longitude = userLocation?.longitude;

    const price = useMemo(() => {
        const temp = Array.from(Array.from({ length: parseInt(starRating) }, (_, i) => i + 1));
        return temp.join(",");
    }, [starRating]);

    const limit = numberOfBusinesses;

    const { loading, error, data } = useQuery<SearchResultData, SearchRequestVars>(GET_YELP_DATA, {
        fetchPolicy: "cache-first",
        variables: {
            request: request,
            price: price,
            latitude: latitude,
            longitude: longitude,
            limit: 49,
            sort_by: orderBy,
        },
    });

    const [dataToShow, setDataToShow] = useState<any | undefined>(undefined);
    const [index, setIndex] = useState<number>(limit);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    if (error) {
        recordError(error);
    }

    const refresh = () => {
        if (index + limit < 49) {
            setRefreshing(true);
            setDataToShow(data?.search.business.slice(index, index + limit));
            setRefreshing(false);
            setIndex(index + limit);
        }
    };

    useEffect(() => {
        setDataToShow(data?.search.business.slice(0, limit));
    }, [loading]);

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
                    data={dataToShow}
                    onRefresh={refresh}
                    refreshing={refreshing}
                    renderItem={({ item }) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate(screens.businessScreen, { business: item })}>
                                <BusinessContainer business={item} />
                            </TouchableWithoutFeedback>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => <View style={{ paddingVertical: 16 }} />}
                />
            )}
        </StyledContainer>
    );
};
