import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ONBOARDING_COMPLETE } from "../constants/storage-keys";
import { Coordinates } from "../models";
import { ErrorReportingContext } from "./error-reporting";

export type AppSettingsContextProps = {
    setSettings: (key: string, val: any) => void;
    clearAll: () => void;
    isOnbordingCompleted: boolean | null;
    userLocation: Coordinates | null;
    requestLocationPermission: () => void;
    isLocationEnabled: boolean | null;
};

export const AppSettingsContext = createContext<AppSettingsContextProps>({
    setSettings: async () => null,
    clearAll: async () => null,
    isOnbordingCompleted: null,
    userLocation: null,
    requestLocationPermission: async () => null,
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
                    console.log("onboarding ", onboardingResult);
                }
                
                const { status } = await Location.getPermissionsAsync();
                if (status == "granted") {
                    setIsLocationEnabled(true);
                    await watchUserLocation();
                } else {
                    await requestLocationPermission();
                }
            } catch (e) {
                recordError(e);
            }
        };
        bootstrapAsync();
    }, []);

    const requestLocationPermission = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status == "granted") {
            setIsLocationEnabled(true);
            await watchUserLocation();
        } else {
            Alert.alert("To use the app you need to allow sharing location");
        }
    };

    const watchUserLocation = async () => {
        await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 805 }, (position: LocationObject) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }).catch((e) => {
            console.log("locatiton is not enabled");
            recordError(e);
        });
    };

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
                requestLocationPermission,
                isLocationEnabled,
            }}>
            {children}
        </AppSettingsContext.Provider>
    );
};
