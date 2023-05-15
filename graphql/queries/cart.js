import gql from "graphql-tag";

export const getLastPaymentIdQuery = gql`
  query {
    getLastPaymentId
  }
`;

export const deliveryOptionsQuery = gql`
  query($nOfProducts: Float, $takeMethod: String) {
    deliveryOptions(nOfProducts: $nOfProducts, takeMethod: $takeMethod) {
      take {
        type
        name
        needAddAddress
        description
      }
      leave {
        type
        name
        needAddAddress
        description
      }
    }
  }
`;

export const deliveryTaxesQuery = gql`
  query(
    $leaveType: String
    $takeType: String!
    $takeZipcode: String
    $leaveZipcode: String
  ) {
    deliveryTaxes(
      leaveType: $leaveType
      takeType: $takeType
      takeZipcode: $takeZipcode
      leaveZipcode: $leaveZipcode
    )
  }
`;

export const ordersQuery = gql`
  query {
    orders {
      key
      current
      rentDays
      products {
        key
        name
        priceValue
      }
      date
      productsValue
      deliveryTaxes
      cupomValue
      total
      payment
      renewed
      renewedTimes
      canRenew
      paymentId
      takeAddress {
        methodTypeString
        priceValue
        line1
        line2
        line3
      }
      leaveAddress {
        methodTypeString
        priceValue
        line1
        line2
        line3
      }
      status
      step
      statusIcon
    }
  }
`;

export const createOrderMutation = gql`
  mutation(
    $productKeys: [String!]!
    $totalSumCart: Float!
    $paymentKey: String!
    $cupomKey: String
    $leaveDeliveryMethod: String
    $takeDeliveryMethod: String!
    $takeDeliveryAddressKey: String
    $leaveDeliveryAddressKey: String
    $productsOptions: [ProductsOptions!]
  ) {
    createOrder(
      productKeys: $productKeys
      paymentKey: $paymentKey
      totalSumCart: $totalSumCart
      cupomKey: $cupomKey
      takeDeliveryMethod: $takeDeliveryMethod
      leaveDeliveryMethod: $leaveDeliveryMethod
      takeDeliveryAddressKey: $takeDeliveryAddressKey
      leaveDeliveryAddressKey: $leaveDeliveryAddressKey
      productsOptions: $productsOptions
    ) {
      success
      message
      order {
        key
        isFirst
        current
        rentDays
        products {
          key
          name
          priceValue
        }
        date
        productsValue
        deliveryTaxes
        cupomValue
        total
        payment
        status
        takeAddress {
          methodTypeString
          priceValue
          line1
          line2
          line3
        }
        leaveAddress {
          methodTypeString
          priceValue
          line1
          line2
          line3
        }
        status
      }
    }
  }
`;

export const renewOrderMudation = gql`
  mutation($key: String!, $payment: String!) {
    renewOrderOcurring(key: $key, paymentKey: $payment) {
      success
      message
      order {
        key
        isFirst
        current
        rentDays
        products {
          key
          name
          priceValue
        }
        date
        productsValue
        deliveryTaxes
        cupomValue
        total
        payment
        status
        takeAddress {
          methodTypeString
          priceValue
          line1
          line2
          line3
        }
        leaveAddress {
          methodTypeString
          priceValue
          line1
          line2
          line3
        }
        status
      }
    }
  }
`;
