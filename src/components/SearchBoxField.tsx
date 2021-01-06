import styled from "@emotion/native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, fontfamilies, fontSizes } from "../constants";

type SearchBoxFieldProps = {
    placeholder: string;
    value: string;
    onTextChange: (text: string) => void;
    onSubmit: () => void;
};

const StyledContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border-color: ${colors.white};
    background-color: ${colors.white};
    border-width: 1px;
    border-radius: 16px;
    height: 70px;
`;

const StyledIconContainer = styled.View`
    height: 100%;
    width: 24px;
    align-items: center;
    justify-content: center;
`;

const StyledTextInputContainer = styled.View`
    flex: 1;
    margin: 4px;
`;

const StyledTextInput = styled(TextInput)`
    flex: 1;
    font-family: ${fontfamilies.ptSerif};
    font-size: ${fontSizes.regular};
    color: ${colors.black};
    opacity: 1;
    margin: 4px;
`;

export const SearchBoxField: React.FC<SearchBoxFieldProps> = ({ placeholder, value, onTextChange, onSubmit }) => {
    return (
        <StyledContainer>
            <StyledIconContainer>
                <FontAwesome name="search" size={16} color={colors.lightGrey} style={{ marginLeft: 4 }} />
            </StyledIconContainer>
            <StyledTextInputContainer>
                <StyledTextInput
                    onSubmitEditing={onSubmit}
                    onChangeText={(text) => onTextChange(text)}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.lightGrey}
                    keyboardAppearance={"dark"}
                    autoFocus={false}
                />
            </StyledTextInputContainer>
            {value != "" && (
                <StyledIconContainer>
                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => onTextChange("")}>
                        <FontAwesome name="close" size={16} color={colors.lightGrey} style={{ marginRight: 4 }} />
                    </TouchableOpacity>
                </StyledIconContainer>
            )}
        </StyledContainer>
    );
};
