import styled from "@emotion/native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { RoundedButton } from "./RoundedButton";

type FooterProps = {
  backgroundColor: string;
  leftButtonLabel: string | null;
  leftButtonPress: () => void;
  rightButtonLabel: string | null;
  rightButtonPress: () => void;
};

type StyledContainerProps = {
  backgroundColor: string;
  height: number;
  paddingHorizontal: number;
  leftButton: string | null;
};

const StyledContainer = styled.View<StyledContainerProps>`
  flex-direction: row;
  justify-content: ${(props: StyledContainerProps) =>
    props.leftButton ? "space-between" : "flex-end"};
  align-items: center;
  height: ${(props: StyledContainerProps) => props.height};
  background-color: ${(props: StyledContainerProps) => props.backgroundColor};
  opacity: 0.6;
  padding-top: ${(props: StyledContainerProps) => props.paddingHorizontal};
`;

export const Footer: React.FC<FooterProps> = ({
  backgroundColor,
  leftButtonLabel,
  leftButtonPress,
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
      leftButton={leftButtonLabel}
    >
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      {rightButtonLabel && (
        <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
      )}
    </StyledContainer>
  );
};
