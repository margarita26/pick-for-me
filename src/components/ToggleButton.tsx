import React from "react";
import { Switch } from "react-native";
import { colors } from "../constants/colors";

type ToggleButtonProps = {
    isEnabled: boolean;
    toggleSwitch: (val : boolean) => void;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({ isEnabled, toggleSwitch }) => {
    return (
        <Switch
            trackColor={{ false: colors.grey, true: colors.green }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.darkGrey}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};
