import styled from "@emotion/native";
import React from "react";
import { colors, fontfamilies, fontSizes } from "../constants";

type RoundedButtonProps = {
  label: string;
  onPress: () => void;
};

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-family: ${fontfamilies.ptSerif};
  font-size: ${fontSizes.regular};
  color: ${colors.white};
`;

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  label,
  onPress,
}) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText>{label}</StyledText>
    </StyledButton>
  );
};
