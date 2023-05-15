import gql from 'graphql-tag'


export const aboutQuery = gql`
query{
  about{
    name
    instagram
    description
    terms
    politics
  }
  help
}
`
export const updateVersionQuery = gql`
query($currentVersion : String!){
  updateVersion(currentVersion: $currentVersion){
    key
    title
    img
    link
    texts
    force
    btnText
    btnCancel
  }
}
`