import * as React from "react";
import { createContext } from "react";
import { Alert } from "react-native";

export type ErrorReportingContextProps = {
    recordError: (error: Error) => void;
};

export const ErrorReportingContext = createContext<ErrorReportingContextProps>({
    recordError: () => null,
});

export const ErrorReportingProvider: React.FC = ({ children }) => {
    const recordError = (error: Error) => {
        try {
            Alert.alert("ErrorReportingProvider: recordError - " + error);
        } catch (error) {}
    };

    return (
        <ErrorReportingContext.Provider
            value={{
                recordError,
            }}>
            {children}
        </ErrorReportingContext.Provider>
    );
};
