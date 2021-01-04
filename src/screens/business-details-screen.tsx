import styled from "@emotion/native";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { Linking, Platform, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { colors, screens } from "../constants";
import { AppSettingsContext } from "../context/app-settings";
import { RootStackParamList } from "../navigation";

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${colors.main};
    align-items: center;
    justify-content: center;
`;

type BusinessScreenRouteParams = RouteProp<RootStackParamList, screens.businessScreen>;

type Props = {
    route: BusinessScreenRouteParams;
};

export const BusinessScreen: React.FC<Props> = ({ route }) => {
    const { business } = route.params;
    const { userLocation } = useContext(AppSettingsContext);

    const handleMarkerPress = () => {
        let daddr = encodeURIComponent(`${business?.location.address1} ${business?.location.postal_code}, ${business?.location.city}`);

        if (Platform.OS === "ios") {
            Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
            Linking.openURL(`http://maps.google.com/?saddr=${daddr}`);
        }
    };

    const YelpIcon = () => {
        return business ? (
            <View style={{ width: "25%", alignItems: "flex-start", justifyContent: "center" }}>
                <FontAwesome
                    onPress={() => Linking.openURL(business.url)}
                    style={{
                        borderRadius: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderWidth: 2,
                        borderColor: colors.main,
                        marginLeft: 8,
                        marginTop: 16,
                    }}
                    name="yelp"
                    size={24}
                    color={colors.main}
                />
            </View>
        ) : null;
    };

    console.log(business?.name);
    return (
        <StyledContainer>
            {business?.coordinates && userLocation && (
                <MapView
                    mapType={Platform.OS == "android" ? "none" : "standard"}
                    showsUserLocation={true}
                    style={{ flex: 1, width: "100%", height: "100%" }}
                    initialRegion={{
                        latitude: business?.coordinates.latitude,
                        longitude: business?.coordinates.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}>
                    <YelpIcon />
                    <Marker
                        onPress={() => handleMarkerPress()}
                        coordinate={{ latitude: business?.coordinates.latitude, longitude: business?.coordinates.longitude }}
                        title={business.name}
                    />
                </MapView>
            )}
        </StyledContainer>
    );
};
