import styled from "@emotion/native";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SearchBoxField } from "../components/SearchBoxField";
import { colors } from "../constants";

const StyledContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.main};
  padding-top: 64px;
`;

export const Home: React.FC = () => {
  const windowHeight = useWindowDimensions().height;
  const geoTogglePosition = windowHeight / 4;
  const bottomPosn = geoTogglePosition.toString() + "px";
  return (
    <StyledContainer>
      <View>
        <SearchBoxField placeholder={"What are you looking for?"} />
      </View>
    </StyledContainer>
  );
};
