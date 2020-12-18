import { gql } from "@apollo/client";

export const GET_YELP_DATA = gql`
    query getData($request: String, $price: String, $latitude: Float, $longitude: Float, $limit: Int) {
        search(
            term: $request,
            price: $price,
            latitude: $latitude,
            longitude: $longitude,
            limit: $limit,
            radius: 4000,
            open_now: true,
            sort_by: "distance"
        ) {
            business {
                phone
                name
                distance
                rating
                review_count
                photos
                coordinates {
                    latitude
                    longitude
                }
                location {
                    address1
                    city
                    state
                    country
                }
            }
        }
    }
`;
