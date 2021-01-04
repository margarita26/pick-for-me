import { gql } from "@apollo/client";

export const GET_YELP_DATA = gql`
    query getData($request: String, $price: String, $latitude: Float, $longitude: Float, $limit: Int, $sort_by: String) {
        search(
            term: $request,
            price: $price,
            latitude: $latitude,
            longitude: $longitude,
            limit: $limit,
            sort_by: $sort_by,
            radius: 4828,
            open_now: true,
        ) {
            business {
                url
                phone
                name
                distance
                price
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
                    postal_code
                    country
                }
            }
        }
    }
`;
