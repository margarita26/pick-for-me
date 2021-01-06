import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { IS_LOCATION_ENABLED, ONBOARDING_COMPLETE } from "../constants/storage-keys";
import { Coordinates } from "../models";
import { ErrorReportingContext } from "./error-reporting";

export type AppSettingsContextProps = {
    setSettings: (key: string, val: any) => void;
    clearAll: () => void;
    isOnbordingCompleted: boolean | null;
    userLocation: Coordinates | null;
    watchUserLocation: () => void;
    isLocationEnabled: boolean | null;
};

export const AppSettingsContext = createContext<AppSettingsContextProps>({
    setSettings: async () => null,
    clearAll: async () => null,
    isOnbordingCompleted: null,
    userLocation: null,
    watchUserLocation: async () => null,
    isLocationEnabled: null,
});

export const AppSettingsProvider: React.FC = ({ children }) => {
    const { recordError } = useContext(ErrorReportingContext);
    const [isOnbordingCompleted, setisOnbordingCompleted] = useState<boolean | null>(null);
    const [isLocationEnabled, setIsLocationEnabled] = useState<boolean | null>(null);
    const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const onboardingResult = await AsyncStorage.getItem(ONBOARDING_COMPLETE);
                if (onboardingResult) {
                    setisOnbordingCompleted(JSON.parse(onboardingResult));
                    console.log(onboardingResult);
                }
                const locationEnabled = await AsyncStorage.getItem(IS_LOCATION_ENABLED);
                if (locationEnabled) {
                    setIsLocationEnabled(JSON.parse(locationEnabled));
                    await watchUserLocation();
                    console.log(isLocationEnabled);
                }

            } catch (e) {
                recordError(e);
            }
        };
        bootstrapAsync();
    }, []);

    const watchUserLocation = async () => {
        await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 805 }, (position: LocationObject) => {
            console.log("saving location");
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }).catch((e) => {
            recordError(e);
            console.log(e);
        });
    };

    const setSettings = async (key: string, val: any) => {
        try {
            if (key === ONBOARDING_COMPLETE) {
                setisOnbordingCompleted(true);
            }
            if (key === IS_LOCATION_ENABLED) {
                setIsLocationEnabled(true);
            }
            await AsyncStorage.setItem(key, val);
        } catch (error) {
            recordError(error);
        }
    };

    const clearAll = async () => {
        try {
            setisOnbordingCompleted(false);
            setIsLocationEnabled(false);
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
                watchUserLocation,
                isLocationEnabled,
            }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
