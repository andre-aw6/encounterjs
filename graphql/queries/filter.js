import gql from 'graphql-tag'

export const getFiltersQuery = gql

`query{
    getFilters{
      filters{
        type
        title
        isSingle
        options
        values
        info{
            name
            description
        }
        isCircle
      }
      selected{
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
  }`
export const getFilterQuery = gql

`query($key: String!){
  getFilter(key: $key){
    searchGroup
    order
    categories
    tags
    numberOfPlayer
    matchTimeAverage
    complexity
    language
    price
    age
    text
  }
}`