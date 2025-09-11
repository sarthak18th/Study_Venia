import gql from "graphql-tag";
export const SET_BILLING_ADDRESS=gql`
mutation setBillingAddress(
  $cartId: String!
  $firstName: String!
  $lastName: String!
  $street1: String!
  $street2: String
  $city: String!
  $region: String!
  $postcode: String!
  $country: String!
  $phoneNumber: String!
) {
  setBillingAddressOnCart(
    input: {
      cart_id: $cartId
      billing_address: {
        address: {
          firstname: $firstName
          lastname: $lastName
          street: [$street1, $street2]
          city: $city
          region: $region
          postcode: $postcode
          country_code: $country
          telephone: $phoneNumber
          save_in_address_book: false
        }
      }
    }
  ) {
    cart {
      id
      billing_address {
        firstname
        lastname
        country {
          code
          __typename
        }
        street
        city
        region {
          code
          __typename
        }
        postcode
        telephone
        __typename
      }
      ...PriceSummaryFragment
      ...AvailablePaymentMethodsFragment
      __typename
    }
    __typename
  }
}
fragment PriceSummaryFragment on Cart {
  id
  items {
    uid
    quantity
    __typename
  }
  ...ShippingSummaryFragment
  prices {
    ...TaxSummaryFragment
    ...DiscountSummaryFragment
    ...GrandTotalFragment
    subtotal_excluding_tax {
      currency
      value
      __typename
    }
    subtotal_including_tax {
      currency
      value
      __typename
    }
    __typename
  }
  ...GiftCardSummaryFragment
  ...GiftOptionsSummaryFragment
  __typename
}
fragment DiscountSummaryFragment on CartPrices {
  discounts {
    amount {
      currency
      value
      __typename
    }
    label
    __typename
  }
  __typename
}
fragment GiftCardSummaryFragment on Cart {
  id
  applied_gift_cards {
    code
    applied_balance {
      value
      currency
      __typename
    }
    __typename
  }
  __typename
}
fragment GiftOptionsSummaryFragment on Cart {
  id
  prices {
    gift_options {
      printed_card {
        value
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment GrandTotalFragment on CartPrices {
  grand_total {
    currency
    value
    __typename
  }
  __typename
}
fragment ShippingSummaryFragment on Cart {
  id
  shipping_addresses {
    selected_shipping_method {
      amount {
        currency
        value
        __typename
      }
      __typename
    }
    street
    __typename
  }
  __typename
}
fragment TaxSummaryFragment on CartPrices {
  applied_taxes {
    amount {
      currency
      value
      __typename
    }
    __typename
  }
  __typename
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

export const PLACE_ORDER=gql`
mutation placeOrder($cartId: String!) {
  placeOrder(input: { cart_id: $cartId }) {
    order {
      order_number
      __typename
    }
    __typename
  }
}
`

export const GET_ORDER_DETAILS=gql`
query getOrderDetails($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    ...OrderConfirmationPageFragment
    __typename
  }
}
fragment OrderConfirmationPageFragment on Cart {
  id
  email
  total_quantity
  shipping_addresses {
    firstname
    lastname
    street
    city
    region {
      label
      __typename
    }
    postcode
    country {
      label
      __typename
    }
    telephone
    selected_shipping_method {
      carrier_title
      method_title
      amount {
        value
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  selected_payment_method {
    purchase_order_number
    title
    __typename
  }
  prices {
    grand_total {
      value
      currency
      __typename
    }
    discounts {
      amount {
        currency
        value
        __typename
      }
      label
      __typename
    }
    applied_taxes {
      label
      amount {
        value
        __typename
      }
      __typename
    }
    __typename
  }
  applied_coupons {
    code
    __typename
  }
  selected_payment_method {
    code
    title
    __typename
  }
  ...ItemsReviewFragment
  __typename
}
fragment ItemsReviewFragment on Cart {
  id
  total_quantity
  prices {
    grand_total {
      currency
      value
      __typename
    }
    discounts {
      amount {
        value
        __typename
      }
      label
      __typename
    }
    subtotal_excluding_tax {
      value
      __typename
    }
    applied_taxes {
      label
      amount {
        value
        __typename
      }
      __typename
    }
    __typename
  }
  applied_coupons {
    code
    __typename
  }
  items {
    id
    uid
    product {
      id
      uid
      name
      sku
      heydude_global_sku
      thumbnail {
        url
        __typename
      }
      colour
      heydude_primary_category
      url_key
      price_range {
        minimum_price {
          discount {
            amount_off
            percent_off
            __typename
          }
          final_price {
            currency
            value
            __typename
          }
          regular_price {
            currency
            value
            __typename
          }
          __typename
        }
        __typename
      }
      ... on ConfigurableProduct {
        variants {
          attributes {
            uid
            __typename
          }
          product {
            id
            uid
            sku
            thumbnail {
              url
              __typename
            }
            stock_status
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    prices {
      price {
        currency
        value
        __typename
      }
      row_total {
        value
        __typename
      }
      total_item_discount {
        value
        __typename
      }
      __typename
    }
    quantity
    errors {
      code
      message
      __typename
    }
    ... on ConfigurableCartItem {
      configurable_options {
        configurable_product_option_uid
        option_label
        configurable_product_option_value_uid
        value_label
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

`