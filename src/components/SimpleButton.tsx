import styled from "@emotion/native";
import React from "react";
import { fontfamilies } from "../constants";

type RoundedButtonProps = {
    label: string;
    fontSize: string;
    fontColor: string;
    onPress: () => void;
};

type StyledTextProps = {
    fontSize: string;
    fontColor: string;
};

const StyledButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const StyledText = styled.Text<StyledTextProps>`
    font-family: ${fontfamilies.ptSerif};
    font-size: ${(props: StyledTextProps) => props.fontSize};
    color: ${(props: StyledTextProps) => props.fontColor};
`;

export const SimpleButton: React.FC<RoundedButtonProps> = ({ label, fontSize, fontColor, onPress }) => {
    return (
        <StyledButton onPress={onPress}>
            <StyledText fontSize={fontSize} fontColor={fontColor}>
                {label}
            </StyledText>
        </StyledButton>
    );
};
