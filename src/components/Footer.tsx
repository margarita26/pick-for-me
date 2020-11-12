import styled from "@emotion/native";
import React from "react";
import { colors } from "../constants";
import { fontSizes } from "../constants/font-size";
import { RoundedButton } from "./RoundedButton";

type FooterProps = {
    leftButtonLabel: string | null;
    leftButtonPress: () => void;
    rightButtonLabel: string | null;
    rightButtonPress: () => void;
};

type StyledContainerProps = {
    leftButton: string | null;
};

const StyledContainer = styled.View<StyledContainerProps>`
    background-color: ${colors.main};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    opacity: 0.6;
`;

const StyledButtonContainer = styled.View`
    flex: 1;
`;

export const Footer: React.FC<FooterProps> = ({ leftButtonLabel, leftButtonPress, rightButtonLabel, rightButtonPress }) => {
    return (
        <StyledContainer leftButton={leftButtonLabel}>
            {leftButtonLabel && (
                <StyledButtonContainer>
                    <RoundedButton
                        label={leftButtonLabel}
                        fontSize={fontSizes.regular}
                        fontColor={colors.white}
                        onPress={leftButtonPress}
                    />
                </StyledButtonContainer>
            )}
            {rightButtonLabel && (
                <StyledButtonContainer>
                    <RoundedButton
                        label={rightButtonLabel}
                        fontSize={fontSizes.regular}
                        fontColor={colors.white}
                        onPress={rightButtonPress}
                    />
                </StyledButtonContainer>
            )}
        </StyledContainer>
    );
};
