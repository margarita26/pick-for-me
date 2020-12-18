import styled from "@emotion/native";
import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image, Linking, View } from "react-native";
import { colors, fontfamilies, fontSizes } from "../constants";
import { Business } from "../models/business-data";

type BusinessContainerProps = {
    business: Business;
};

type TextProps = {
    fontSize: string;
};

const StyledContainer = styled.View`
    min-height: 128px;
    padding: 4px;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    max-height: 300px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const StyledImageContainer = styled.View`
    flex: 1;
    margin: 4px;
`;

const StyledBusinessInfoContainer = styled.View`
    flex: 2;
    flex-direction: column;
`;

const StyledBusinessNameContainer = styled.View`
    padding-left: 4px;
    padding-right: 4px;
    justify-content: center;
`;

const StyledIconsAndDetailsContainer = styled.View`
    flex-direction: row;
`;

const StyledText = styled.Text<TextProps>`
    font-size: ${(props: TextProps) => props.fontSize};
    font-family: ${fontfamilies.ptSerif};
    color: ${colors.black};
`;

const StyledIconsContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const StyledBusinessDetailsContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;

    padding-left: 4px;
`;

export const BusinessContainer: React.FC<BusinessContainerProps> = ({ business }) => {
    const getMiles = (distance: number) => {
        return Number((distance / 1609.344).toFixed(2));
    };

    return (
        <StyledContainer>
            <StyledImageContainer>
                <Image source={{ uri: business.photos[0] }} style={{ flex: 1, borderRadius: 10 }} />
            </StyledImageContainer>
            <StyledBusinessInfoContainer>
                <StyledBusinessNameContainer>
                    <StyledText fontSize={fontSizes.regular}>{business.name}</StyledText>
                </StyledBusinessNameContainer>
                <StyledIconsAndDetailsContainer>
                    <StyledIconsContainer>
                        <FontAwesome name="phone" size={16} color={colors.darkGrey} style={{ margin: 4 }} />
                        <FontAwesome name="star" size={16} color={colors.yellow} style={{ margin: 4 }} />
                        <FontAwesome name="users" size={16} color={colors.darkGrey} style={{ margin: 4 }} />
                        <FontAwesome name="map-pin" size={16} color={colors.darkGrey} style={{ margin: 4 }} />
                    </StyledIconsContainer>
                    <StyledBusinessDetailsContainer>
                        <StyledText onPress={() => Linking.openURL(`tel:${business.phone}`)} fontSize={fontSizes.regular}>
                            {business.phone}
                        </StyledText>
                        <StyledText fontSize={fontSizes.regular}>{business.rating}</StyledText>
                        <StyledText fontSize={fontSizes.regular}>{business.review_count}</StyledText>
                        <StyledText fontSize={fontSizes.regular}>{getMiles(business.distance)} miles</StyledText>
                    </StyledBusinessDetailsContainer>
                </StyledIconsAndDetailsContainer>
            </StyledBusinessInfoContainer>
        </StyledContainer>
    );
};
