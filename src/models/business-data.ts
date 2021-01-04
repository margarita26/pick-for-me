import { Coordinates, LocationData } from "./location-data";

export type Business = {
    coordinates: Coordinates;
    location: LocationData;
    name: string;
    phone: string;
    url: string;
    distance: number;
    photos: string[];
    rating: number;
    review_count: number;
    price: string;
};

export type BusinessData = {
    business: Business[];
};

export type SearchResultData = {
    search: BusinessData;
};
