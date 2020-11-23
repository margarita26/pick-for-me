import * as React from 'react';
import { AddressData } from '../models/location';
import styled from "@emotion/styled";

type BusinessContainerProps = { 
    name: string; 
    phone: string;
    rating: number; 
    reviewCount: number;
    photos: string[];
    address: AddressData;
}



export const BusinessContainer: React.FC<BusinessContainerProps> = ({name, phone,rating,reviewCount, photos, address}) => { 

    return ();
}