import styled from "@emotion/native";
import React, { useState } from "react";
import { TextInput, useWindowDimensions } from "react-native";
import { colors, fontfamilies, fontSizes } from "../constants";

type SearchBoxFieldProps = {
  placeholder: string;
};

type TextInputProps = {
  width: string;
};

const StyledContainer = styled.View`
  border-color: ${colors.white};
  background-color: ${colors.white};
  opacity: 0.5;
  border-width: 1px;
  border-radius: 2px;
  margin: 16px;
`;

const StyledTextInput = styled(TextInput)`
  height: 40px;
  width: ${(props: TextInputProps) => props.width};
  font-family: ${fontfamilies.ptSerif};
  font-size: ${fontSizes.regular};
  color: ${colors.black};
  opacity: 1;
  margin: 8px;
`;

export const SearchBoxField: React.FC<SearchBoxFieldProps> = ({
  placeholder,
}) => {
  const [value, onChangeText] = useState<string>("");

  const windowWidth = useWindowDimensions().width;
  const fieldWidth = windowWidth * 0.9;
  const stringFieldWidth = fieldWidth.toString() + "px";

  return (
    <StyledContainer>
      <StyledTextInput
        width={stringFieldWidth}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.darkGrey}
        keyboardAppearance={'dark'}
      />
    </StyledContainer>
  );
};
