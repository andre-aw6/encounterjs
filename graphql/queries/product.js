import gql from 'graphql-tag'

export const evaluateProductMutation = gql`
mutation ($evaluation: Float!, $key: String!){
    evaluateProduct(evaluation: $evaluation, key: $key){
      success
      action
      product{
        key
        myEvaluation
        name
        description
        mainImage
        complexity
        language
        matchTimeAverageFormated
        priceValueFormated
        priceValue
        numberOfEvaluation
        evaluation
        numberOfPlayersFormated
        available
        video
        tags
        categories
        images
      }
    }
  }`
export const customFilterQuery = gql`
query($type: String!){
  customFilter(type: $type){
    steps{
      title
      type
      optionsType
      options{
        text
        image
        values
      }
      image
    }
  }
}`