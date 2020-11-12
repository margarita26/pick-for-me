import styled from "@emotion/native";
import React, { useState } from "react";
import { TextInput, useWindowDimensions } from "react-native";
import { colors, fontfamilies, fontSizes } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { fontAwesomeIcons } from "../constants/icons";

type SearchBoxFieldProps = {
    placeholder: string;
};

const StyledContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    border-color: ${colors.white};
    background-color: ${colors.white};
    border-width: 1px;
    border-radius: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const StyledTextInput = styled(TextInput)`
    height: 48px;
    font-family: ${fontfamilies.ptSerif};
    font-size: ${fontSizes.regular};
    color: ${colors.black};
    opacity: 1;
    padding-left: 16px;
    padding-right: 16px;
`;

export const SearchBoxField: React.FC<SearchBoxFieldProps> = ({ placeholder }) => {
    const [value, onChangeText] = useState<string>("");

    return (
        <StyledContainer>
            <FontAwesome name={fontAwesomeIcons.search} size={16} color={colors.grey} />
            <StyledTextInput
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGrey}
                keyboardAppearance={"dark"}
                autoFocus={true}
            />
        </StyledContainer>
    );
};
