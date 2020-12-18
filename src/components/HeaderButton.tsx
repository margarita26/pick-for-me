import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import styled from '@emotion/native';


const StyledButton = styled.TouchableOpacity`
    margin-right: 16px;
`

export const HeaderButton: React.FC = () => {
    return (
        <StyledButton>
            <FontAwesome name="sort-amount-desc" size={16} color={colors.main} />
        </StyledButton>
    );
};
