import gql from 'graphql-tag'


export const cuponsQuery = gql`
query{
  cupons{
    key
    title
    description
    searchId
    expirationDate
    allUsers
    type
    value
    progressBar
    progressBarText
    search{
      order
        searchGroup
        categories
        tags
        numberOfPlayer
        matchTimeAverage
        complexity
        language
        price
        age
      
    }
  }
}
`
export const applyCuponMutation = gql`
mutation($productSum: Float!, $keys: [String!]! ){
  applyCupon(productSum: $productSum, keys: $keys){
    key
    title
    description
    searchId
    expirationDate
    discount
  }
}
`