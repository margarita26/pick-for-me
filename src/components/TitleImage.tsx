import React from "react";
import { Image } from "react-native";

export const TitleImage: React.FC = () => {
    return <Image style={{ width: 128, height: 50 }} source={require("../assets/logo_transparent_background.png")} />;
};
