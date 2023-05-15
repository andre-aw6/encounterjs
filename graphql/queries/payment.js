import gql from 'graphql-tag'

export const paymentMethodsQuery = gql`
query{
    paymentMethods{
      card_number
      card_holder_name
      card_expiration_date
      card_document
      key
    }
  }
  `

export const removePaymentMethodMutation = gql`
mutation($key: String!){
  removePaymentMethod(key: $key){
    success
    action
  }
}
  `

export const createPaymentMethodMutation = gql`
mutation(
  $card_number: String!,
  $card_expiration_date: String!,
  $card_holder_name: String!,
  $card_cvv: String!,
  $card_document: String!
) {
createPaymentMethod(createPayment: {
  card_number: $card_number,
  card_expiration_date: $card_expiration_date,
  card_holder_name: $card_holder_name,
  card_cvv: $card_cvv,
  card_document: $card_document
}){
  success
  action
  message
  paymentMethod{
    key
    card_number
    card_holder_name
    
  }
}
}
`