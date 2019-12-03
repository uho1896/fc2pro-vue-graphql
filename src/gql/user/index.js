import gql from 'graphql-tag';

// query
export const getUser = gql`query ($_id: ID) {
  getUser(_id: $_id) {
    _id
    email
    name
    role
    status
  }
}`;

export const getUserByEmail = gql`query ($email: String!) {
  getUserByEmail(email: $email) {
    _id
    email
    name
    role
    status
  }
}`;

export const getUsers = gql`query {
  getUsers {
    _id
    email
    name
    role
    status
  }
}`;

// mutation
export const login = gql`mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password)
}`;

export const createUser = gql`mutation ($email: String!, $password: String!, $name: String) {
  createUser(email: $email, password: $password, name: $name)
}`;

export const updateUser = gql`mutation ($_id: ID!, $email: String,
  $name: String, $role: Int, $status: Int) {
  updateUser(_id: $_id, email: $email, name: $name, role: $role, status: $status)
}`;

export const activateUser = gql`mutation ($activate: String!) {
  activateUser(activate: $activate)
}`;

export const forgetPwd = gql`mutation ($email: String!) {
  forgetPwd(email: $email)
}`;

export const resetPwd = gql`mutation ($password: String!, $reset: String) {
  resetPwd(password: $password, reset: $reset)
}`;
