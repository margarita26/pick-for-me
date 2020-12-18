import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { ONBOARDING_COMPLETE } from "../constants/storage-keys";
import { ErrorReportingContext } from "./error-reporting";
import { Coordinates } from "../models";
import { LocationObject } from "expo-location";

export type AppSettingsContextProps = {
    setSettings: (key: string, val: any) => void;
    clearAll: () => void;
    isOnbordingCompleted: boolean | null;
    userLocation: Coordinates | null;
};

export const AppSettingsContext = createContext<AppSettingsContextProps>({
    setSettings: async () => null,
    clearAll: async () => null,
    isOnbordingCompleted: null,
    userLocation: null,
});

export const AppSettingsProvider: React.FC = ({ children }) => {
    const { recordError } = React.useContext(ErrorReportingContext);
    const [isOnbordingCompleted, setisOnbordingCompleted] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

    const [locationAsync, setLocationAsync] = useState<any>(null);

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

    useEffect(() => {
        const watchLocation = async () => {
            const location = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, distanceInterval: 1610 },
                (position: LocationObject) => {
                    console.log("resaving location");
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                }
            );
            setLocationAsync(location);
        };
        watchLocation();
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
                userLocation,
            }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
