import { Coordinates, LocationData } from "./location-data";

export type Business = {
    coordinates: Coordinates;
    location: LocationData;
    name: string;
    phone: string;
    distance: number;
    photos: string[];
    rating: number;
    review_count: number;
};

export type BusinessData = {
    business: Business[];
};

export type SearchResultData = {
    search: BusinessData;
};
