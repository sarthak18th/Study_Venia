import gql from "graphql-tag";
export const GET_PAYMENT_METHODS=gql`
query getPaymentInformation($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    selected_payment_method {
      code
      __typename
    }
    shipping_addresses {
      firstname
      lastname
      street
      city
      region {
        code
        __typename
      }
      postcode
      country {
        code
        __typename
      }
      telephone
      __typename
    }
    ...AvailablePaymentMethodsFragment
    __typename
  }
}
fragment AvailablePaymentMethodsFragment on Cart {
  id
  available_payment_methods {
    code
    title
    __typename
  }
  __typename
}
`