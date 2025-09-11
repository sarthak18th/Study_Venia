import gql from "graphql-tag";

export const GET_TRANSIT_AVAILABILITY_AND_DURATION = gql`
  query getTransitAvailabilityAndDuration($pincode: String!, $sku: String!) {
    getTransitAvailabilityAndDuration(pincode: $pincode, sku: $sku) {
      pincode
      is_serviceable
      deliver_in_days
      message
      __typename
    }
  }
`;

