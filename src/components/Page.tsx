import styled from "@emotion/native";
import { Entypo as Icon } from '@expo/vector-icons'; 
import React from "react";
import { colors, fontfamilies, fontSizes } from "../constants";

type ContainerProps = {
  backgroundColor: string;
};

const StyledContainer = styled.View<ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ContainerProps) => props.backgroundColor};
`;

const StyledTitleContainer = styled.View`
  margin-top: 16px;
`;

const StyledText = styled.Text`
  font-family: ${fontfamilies.montserratSemiBold};
  font-size: ${fontSizes.regular};
  color: ${colors.white};
`;

type PageProps = {
  backgroundColor: string;
  iconName: string;
  title: string;
};

export const Page: React.FC<PageProps> = ({
  backgroundColor,
  iconName,
  title,
}) => {
  return (
    <StyledContainer backgroundColor={backgroundColor}>
      <Icon name={iconName} size={128} color="white" />
      <StyledTitleContainer>
        <StyledText>{title}</StyledText>
      </StyledTitleContainer>
    </StyledContainer>
  );
};
