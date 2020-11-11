import React from "react";
import { View, useWindowDimensions } from "react-native";
import { RoundedButton } from "./RoundedButton";
import styled from "@emotion/native";

type FooterProps = {
  backgroundColor: string;
  rightButtonLabel: string;
  rightButtonPress: () => boolean;
};

type StyledContainerProps = {
  backgroundColor: string;
  height: number;
  paddingHorizontal: number;
};

const StyledContainer = styled.View<StyledContainerProps>`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: ${(props: StyledContainerProps) => props.height};
  background-color: ${(props: StyledContainerProps) => props.backgroundColor};
  opacity: 0.6;
  padding-top: ${(props: StyledContainerProps) => props.paddingHorizontal};
`;

export const Footer: React.FC<FooterProps> = ({
  backgroundColor,
  rightButtonLabel,
  rightButtonPress,
}) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <StyledContainer
      height={HEIGHT}
      backgroundColor={backgroundColor}
      paddingHorizontal={FOOTER_PADDING}
    >
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </StyledContainer>
  );
};
