import styled from "@emotion/native";
import React from "react";
import { colors, fontSizes } from "../constants";

type RoundedButtonProps = {
  label: string;
  onPress: () => boolean;
};

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
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
