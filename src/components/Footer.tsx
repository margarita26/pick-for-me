import styled from "@emotion/native";
import React from "react";
import { SimpleButton } from "./SimpleButton";

type FooterProps = {
    backgroundColor: string;
    fontSize: string;
    fontColor: string;
    leftButtonLabel: string | null;
    leftButtonPress: () => void;
    rightButtonLabel: string | null;
    rightButtonPress: () => void;
};

type StyledContainerProps = {
    backgroundColor: string;
};

const StyledContainer = styled.View<StyledContainerProps>`
    background-color: ${(props: StyledContainerProps) => props.backgroundColor};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    opacity: 0.8;
`;

const StyledButtonContainer = styled.View`
    flex: 1;
`;

export const Footer: React.FC<FooterProps> = ({
    backgroundColor,
    fontSize,
    fontColor,
    leftButtonLabel,
    leftButtonPress,
    rightButtonLabel,
    rightButtonPress,
}) => {
    return (
        <StyledContainer backgroundColor={backgroundColor}>
            {leftButtonLabel && (
                <StyledButtonContainer>
                    <SimpleButton label={leftButtonLabel} fontSize={fontSize} fontColor={fontColor} onPress={leftButtonPress} />
                </StyledButtonContainer>
            )}
            {rightButtonLabel && (
                <StyledButtonContainer>
                    <SimpleButton label={rightButtonLabel} fontSize={fontSize} fontColor={fontColor} onPress={rightButtonPress} />
                </StyledButtonContainer>
            )}
        </StyledContainer>
    );
};
