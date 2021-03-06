import * as React from "react";
import { createContext } from "react";
import * as Sentry from "sentry-expo";

export type ErrorReportingContextProps = {
    recordError: (error: Error) => void;
};

export const ErrorReportingContext = createContext<ErrorReportingContextProps>({
    recordError: () => null,
});

export const ErrorReportingProvider: React.FC = ({ children }) => {
    const recordError = (error: Error) => {
        Sentry.Native.captureException(error);
        console.log("Error ", error);
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
