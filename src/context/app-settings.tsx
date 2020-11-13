import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { ONBOARDING_COMPLETE } from "../constants/storage-keys";
import { ErrorReportingContext } from "./error-reporting";

export type AppSettingsContextProps = {
    setSettings: (key: string, val: any) => void;
    clearAll: () => void;
    isOnbordingCompleted: boolean | null;
};

export const AppSettingsContext = createContext<AppSettingsContextProps>({
    setSettings: async () => null,
    clearAll: async () => null,
    isOnbordingCompleted: null,
});

export const AppSettingsProvider: React.FC = ({ children }) => {
    const { recordError } = React.useContext(ErrorReportingContext);
    const [isOnbordingCompleted, setisOnbordingCompleted] = useState<boolean | null>(null);

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const onboardingResult = await AsyncStorage.getItem(ONBOARDING_COMPLETE);
                if (onboardingResult) {
                    setisOnbordingCompleted(JSON.parse(onboardingResult));
                    return;
                }
            } catch (e) {
                recordError(e);
            }
            setisOnbordingCompleted(null);
        };
        bootstrapAsync();
    }, []);

    const setSettings = async (key: string, val: any) => {
        try {
            if (key === ONBOARDING_COMPLETE) {
                setisOnbordingCompleted(true);
            }
            await AsyncStorage.setItem(key, val);
        } catch (error) {
            recordError(error);
        }
    };
    const clearAll = async () => {
        try {
            setisOnbordingCompleted(false);
            AsyncStorage.clear();
        } catch (error) {
            recordError(error);
        }
    };

    return (
        <AppSettingsContext.Provider
            value={{
                setSettings,
                clearAll,
                isOnbordingCompleted,
            }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
