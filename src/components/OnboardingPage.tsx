import styled from "@emotion/native";
import { Ionicons as Icon } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { colors, fontfamilies, fontSizes } from "../constants";
import { AppSettingsContext } from "../context/app-settings";
import { ToggleButton } from "./ToggleButton";

type PageProps = {
    backgroundColor: string;
    iconName: string;
    title: string;
    geoToggle: boolean;
};

type ContainerProps = {
    backgroundColor: string;
};

const StyledContainer = styled.View<ContainerProps>`
    flex: 1;
    background-color: ${(props: ContainerProps) => props.backgroundColor};
`;

const StyledInnerTopContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`;

const StyledInnerBottomContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

const StyledToggleContainer = styled.View`
    flex-direction: row;
`;

const StyledToggleInnerContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-family: ${fontfamilies.ptSerif};
    font-size: ${fontSizes.regular};
    color: ${colors.white};
    text-align: center;
    margin: 16px;
`;

export const Page: React.FC<PageProps> = ({ backgroundColor, iconName, title, geoToggle }) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const { requestLocationPermission } = useContext(AppSettingsContext);

    useEffect(() => {
        const askLocationPermission = async () => {
            if (isEnabled) {
                await requestLocationPermission();
            }
        };
        askLocationPermission();
    }, [isEnabled]);

    return (
        <StyledContainer backgroundColor={backgroundColor}>
            <StyledInnerTopContainer>
                <Icon name={iconName} size={128} color="white" />
            </StyledInnerTopContainer>
            <StyledInnerBottomContainer>
                <StyledText>{title}</StyledText>
                {geoToggle && (
                    <StyledToggleContainer>
                        <StyledToggleInnerContainer>
                            <StyledText>Allow sharing location</StyledText>
                        </StyledToggleInnerContainer>
                        <StyledToggleInnerContainer>
                            <ToggleButton isEnabled={isEnabled} toggleSwitch={setIsEnabled} />
                        </StyledToggleInnerContainer>
                    </StyledToggleContainer>
                )}
            </StyledInnerBottomContainer>
        </StyledContainer>
    );
};
