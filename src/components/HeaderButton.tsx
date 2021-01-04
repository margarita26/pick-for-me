import styled from "@emotion/native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { colors } from "../constants/colors";

const StyledButton = styled.TouchableOpacity`
    margin-right: 16px;
`;

export const HeaderButton: React.FC = () => {
    return (
        <StyledButton>
            <FontAwesome name="sort-amount-desc" size={16} color={colors.main} />
        </StyledButton>
    );
};
