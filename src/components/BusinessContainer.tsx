import * as React from "react";
import { LocationData } from "../models/location-data";
import styled from "@emotion/native";
import { colors } from "../constants";
import { Text } from "react-native";

type BusinessContainerProps = {
    name: string;
    phone: string;
    rating: number;
    reviewCount: number;
    photos: string[];
    address: LocationData;
};

const StyledContainer = styled.View`
    margin: 16px;
    border-radius: 10px;
    background-color: ${colors.white};
    height: 150px;
`;

export const BusinessContainer: React.FC<BusinessContainerProps> = ({ name, phone, rating, reviewCount, photos, address }) => {
    return (
        <StyledContainer>
            <Text>{name}</Text>
            <Text>{phone}</Text>

            <Text>{rating}</Text>
            <Text>{reviewCount}</Text>
        </StyledContainer>
    );
};
