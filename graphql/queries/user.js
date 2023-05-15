import gql from 'graphql-tag'

export const EmailIsRegisteryQuery = gql`
query($email: String!){
    emailIsRegistery(email: $email)
  }
`


export const CreateAuthMutation = gql`
mutation($type: String!, $email: String!, $notificationToken: String, $password: String!, $platform: String!, $os: String!){
  createAuth(user: {
    type: $type,
    email:$email,
    password: $password,
    notificationToken: $notificationToken,
      deviceInfo: {
        platform: $platform,
        os: $os
      }
  }){
    token
    user{
      key
      email
    }
  	success
    action
  }
}
`


export const LoginMutation = gql`
  mutation($type: String!, $email: String!,  $notificationToken: String, $password: String!, $platform: String!, $os: String!){
    login(login: {
      type: $type,
      email:$email,
      notificationToken:$notificationToken,
      password: $password,
      
        deviceInfo: {
          platform: $platform,
          os: $os
        }
    }){
      token
      user{
        key
        email
      }
      success
      action
    }
  }
`

export const ConfirmCodeMutation = gql`
mutation($email: String!, $code: String!, $notificationToken: String, $platform: String!, $os: String!){
  confirmCode(code: $code, email: $email, notificationToken: $notificationToken, os: $os, platform: $platform){
    success
    action
    token
    user{
      key
      email
      name
    }
  }
}
`

export const resetPasswordMutation = gql`
mutation ($email: String!, 
  $newPassword: String!, 
  $token: String!,
  $os: String!,
  $notificationToken: String,
  $platform: String!){
  resetPassword(
    email: $email,
    newPassword: $newPassword,
    token: $token,
    os: $os,
    platform: $platform,
    notificationToken: $notificationToken
  ){
    success
    action
    token
    user{
       key
       email
    }
  }
}
`

export const confirmCodeResetPasswordMutation = gql`
mutation($code: String!, $email: String!){
  confirmCodeResetPassword(code: $code,email: $email){
    success
    action
  }
}
`

export const MeQuery = gql`
query{
  me{
    success
    action
    user{
      key
      email
      image
    }
  }
}
`


export const UserNotificationsQuery = gql`
query{
  user{
   notifications{
      title
      key
      body
      date
      dateFormated
      action
      viewed
      dateTimeFormated
    }
 }
}
`

export const SetNotificationViewedMutation = gql`
mutation($key: String!){
  setNotificationViewed(key: $key){
    key
    title
    body
    date
    dateFormated
    dateTimeFormated
    action
    viewed
  }
}
`

export const UserInfoQuery = gql`
query{
  pendences
  user{
   key
   name
   rememberProductKeys
   email
   lastname
   preferenceName
   document
   cellphone
   gender
   img
   type
   birthday
   birthdayFormatted
   favorites{
     key
     name
     mainImage
     available
   }    
   address{
    key
    name
    cep
    city
    state
    number
    complement	
    reference
    street
    nameFormated
    addressFormated
    active
    neighborhood
  }
 }
}
`

export const EditBasicInfoMutation = gql`
mutation($name: String!, $lastname: String!, $preferenceName: String!, $birthday: String, $cellphone: String!, $terms: Boolean!, $gender: String, $document: String! ){
  editBasicInfo(infos: {
    name: $name,
    lastname: $lastname,
    preferenceName: $preferenceName,
    birthday: $birthday,
    cellphone: $cellphone,
    terms: $terms,
    gender: $gender,
    document: $document,
  }){
     success
     action
  }
}
`

export const ToggleFavoriteMutation = gql`
mutation($productId : String!) {
  toggleFavorite(product_id: $productId){
    success
    action
  }
}`

  export const getAddressByLatLongQuery = gql`
  query($lat: String!, $long: String!){
    getAddressByLatLong(lat: $lat, long: $long){
      success
      action
      address{
        cep
        street
        neighborhood
        city
        formatted_address
        state
        lat
        long
      }
    }
  }
`
  export const getAddressBySearcQuery = gql`
  query($search: String!){
    getAddressBySearch(search: $search){
      success
      action
      adresses{
        cep
        street
        neighborhood
        city
        formatted_address
        state
        lat
        long
      }
    }
  }
`


export const addAddressMutation = gql`
mutation (
  $name: String!, $cep: String!, $street: String!, $neighborhood: String!, $city: String!, $state: String!, $number: String!, $complement: String!, $reference: String!, $lat: String!, $long: String!
){
  addAddress(address: {
    name: $name,
    cep: $cep,
    street: $street,
    neighborhood: $neighborhood,
    city: $city,
    state: $state,
    number: $number,
    complement: $complement,
    reference: $reference,
    lat: $lat,
    long: $long
  }){
    success
    action
    address{
      key
      name
      cep
      city
      state
      number
      complement	
      reference
      street
      active
      nameFormated
      addressFormated
      neighborhood
    }
  }
}`


export const editAddressMutation = gql`
mutation (
  $key: String!, $name: String!, $number: String!, $complement: String!, $reference: String!
){
  editAddress(key: $key, address: {
    name: $name,
    number: $number,
    complement: $complement,
    reference: $reference,
  }){
    success
    action
    address{
      key
      name
      cep
      city
      state
      active
      number
      complement	
      reference
      street
      nameFormated
      addressFormated
      neighborhood
    }
  }
}`



export const removeAddressMutation = gql`
mutation (
  $key: String!
){
  removeAddress(key: $key){
    success
    action
  }
}`

export const uploadDocumentMutation = gql`
mutation ($url: String!, $type: String!){
  uploadDocument(url: $url, type: $type){
    success
    action
  }
}
`

export const forgotMutation = gql`
mutation($email: String!){
  forgot(email: $email){
    success
    action
  }
}`

export const rememberMeMutation = gql`
mutation ($key: String!){
  rememberMe(key: $key){
    success
    action
  }
}`

export const respondQuestionMutation = gql`
mutation($deviceId: String!, $value: String!){
  respondQuestion(deviceId: $deviceId, value: $value)
}`