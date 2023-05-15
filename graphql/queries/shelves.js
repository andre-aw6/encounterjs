
// import {  } from 'apollo-client';
import gql from 'graphql-tag'

export const bannersQuery = gql`
query{
  banners{
    key
    url
    type
    action
    value
  }
}
  `

export const getShelvesQuery = gql`
query($searchGroup: [String!],
  $order: [String!],
  $categories: [String!],
  $tags: [String!],
  $numberOfPlayer: [String!],
  $matchTimeAverage: [String!],
  $complexity: [String!],
  $language: [String!],
  $price: [String!],    ){
    shelves(filter: {
      searchGroup: $searchGroup,
      order: $order,
      categories: $categories,
      tags: $tags,
      numberOfPlayer: $numberOfPlayer,
      matchTimeAverage: $matchTimeAverage,
      complexity: $complexity,
      language: $language,
      price: $price,    
      }){
      title
      key
      subtitle
      order
      top
      spotlight
      filter{
        searchGroup
        order
        numberOfPlayer
        matchTimeAverage
        complexity
        language
        price
      }
      products{
        key
        name
        description
        mainImage
        complexity
        language
        matchTimeAverageFormated
        priceValueFormated
        priceValue
        numberOfPlayersFormated
        available
        video
        age
        tags
        categories
        images
        
      }
    }
  }
  `

export const getProductQuery = gql`
query($id: String!){
  product(key: $id){
    success
    action
    product{
      key
      name
      myEvaluation
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
      age
      tags
      categories
      images
    }
  }
}
`

export const ProductsQuery = gql`
query(
	$text: String,
	$searchGroup: [String!]!,
  $order: [String!]!,
  $categories: [String!],
  $tags: [String!],
  $numberOfPlayer: [String!],
  $matchTimeAverage: [String!],
  $complexity: [String!],
  $language: [String!],
  $price: [String!],    
  $age: [String!],    
){
  products(filter: {
  text: $text,
  searchGroup: $searchGroup,
  order: $order,
  categories: $categories,
  tags: $tags,
  numberOfPlayer: $numberOfPlayer,
  matchTimeAverage: $matchTimeAverage,
  complexity: $complexity,
  language: $language,
  price: $price,    
  age: $age,    
  }){
    success
    action
    products{
      key
      name
      description
      mainImage
      complexity
      language
      matchTimeAverageFormated
      priceValueFormated
      priceValue
      numberOfPlayersFormated
      available
      age
      video
      tags
      categories
      images
    }
  }
}
`