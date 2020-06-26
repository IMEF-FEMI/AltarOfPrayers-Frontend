import gql from "graphql-tag";

export const loginUser = gql`
  mutation loginUserMutation(
    $email: String!
    $password: String!
    $loginMethod: String!
  ) {
    loginUser(email: $email, password: $password, loginMethod: $loginMethod) {
      token
      success
      error
      user {
        id
        email
        fullname
        accountType
        staff
        admin
        isVerified
      }
    }
  }
`;

export const addEdition = gql`
  mutation createEdition($name: String!, $startingMonth: Int!, $year: Int!) {
    createEdition(name: $name, startingMonth: $startingMonth, year: $year) {
      success
      error
      edition {
        id
        name
        published
        startingMonth
        year
      }
    }
  }
`;

export const updateEdition = gql`
  mutation updateEdition(
    $editionId: Int!
    $name: String!
    $startingMonth: Int!
    $year: Int!
  ) {
    updateEdition(
      editionId: $editionId
      name: $name
      startingMonth: $startingMonth
      year: $year
    ) {
      success
      error
      edition {
        id
        name
        published
        startingMonth
        year
      }
    }
  }
`;

export const publishEdition = gql`
  mutation publishEdition($editionId: Int!) {
    publishEdition(editionId: $editionId) {
      success
      error
    }
  }
`;
export const deleteEdition = gql`
  mutation deleteEdition($editionId: Int!) {
    deleteEdition(editionId: $editionId) {
      success
      error
    }
  }
`;
export const addPrayer = gql`
  mutation addPrayer(
    $day: Int!
    $editionId: Int!
    $month: Int!
    $prayer: JSONString!
  ) {
    addPrayer(
      day: $day
      editionId: $editionId
      month: $month
      prayer: $prayer
    ) {
      success
      error
      prayer
    }
  }
`;

export const deletePrayer = gql`
  mutation deletePrayer($day: Int!, $editionId: Int!, $month: Int!) {
    deletePrayer(day: $day, editionId: $editionId, month: $month) {
      success
      error
    }
  }
`;

export const editions = gql`
  query editions($search: String, $first: Int, $skip: Int) {
    editions(search: $search, first: $first, skip: $skip) {
      id
      name
      published
      startingMonth
      year
    }
  }
`;

export const edition = gql`
  query edition($id: Int!) {
    edition(id: $id) {
      id
      name
      published
      startingMonth
      year
      monthOne
      monthTwo
      monthThree
    }
  }
`;
export const editionsInfo = gql`
  query editionsInfo($search: String, $first: Int, $skip: Int) {
    editionsInfo(search: $search, first: $first, skip: $skip)
  }
`;
export const getPrayer = gql`
  query prayer($editionId: Int!, $day: Int!, $month: Int!) {
    prayer(editionId: $editionId, day: $day, month: $month)
  }
`;
export const getEditionsCount = gql`
  query {
    count
  }
`;
export const getUsersCount = gql`
  query {
    usersCount
  }
`;

export const users = gql`
  query users($search: String, $first: Int, $skip: Int) {
    users(search: $search, first: $first, skip: $skip) {
      id
      email
      fullname
      createdAt
      admin
    }
  }
`;

export const adminNotifications = gql`
  query adminNotifications($search: String, $first: Int, $skip: Int) {
    adminNotifications(search: $search, first: $first, skip: $skip) {
      id
      title
      message
      createdAt
    }
  }
`;
export const createNotification = gql`
  mutation createNotification($title: String!, $message: String!) {
    createNotification(title: $title, message: $message) {
      success
      error
      notification{
        id
        title
        message
        createdAt
      }
    }
  }
`;
export const deleteNotification = gql`
  mutation deleteNotification($id: Int!) {
    deleteNotification(id: $id) {
      success
      error
    }
  }
`;
export const getNotificationsCount = gql`
  query {
    notificationsCount
  }
`;
export const makeAdmin = gql`
  mutation makeAdmin($email: String!) {
    makeAdmin(email: $email) {
      user {
        id
        email
        fullname
        createdAt
        admin
      }
      success
      error
    }
  }
`;

export const removeAdmin = gql`
  mutation removeAdmin($email: String!) {
    removeAdmin(email: $email) {
      user {
        id
        email
        fullname
        createdAt
        admin
      }
      success
      error
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email) {
      success
      error
    }
  }
`;
