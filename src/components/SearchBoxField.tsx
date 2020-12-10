import styled from "@emotion/native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TextInput } from "react-native";
import { colors, fontfamilies, fontSizes } from "../constants";
import { fontAwesomeIcons } from "../constants/icons";

type SearchBoxFieldProps = {
    placeholder: string;
    value: string;
    onTextChange: (text: string) => void;
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

export const SearchBoxField: React.FC<SearchBoxFieldProps> = ({ placeholder, value, onTextChange }) => {
    return (
        <StyledContainer>
            <FontAwesome name={fontAwesomeIcons.search} size={16} color={colors.grey} />
            <StyledTextInput
                onChangeText={(text) => onTextChange(text)}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.lightGrey}
                keyboardAppearance={"dark"}
                autoFocus={false}
            />
        </StyledContainer>
    );
};
