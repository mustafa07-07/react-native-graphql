import gql from "graphql-tag";

export const FETCH_ALL_USERS = gql`
query {
  users {
    username
    id
  }
}
`;
export const LOGIN = gql`
mutation ($username: String!, $password: String!) {
  login(data: {username: $username, password: $password}) {
    token
  }
}
`;