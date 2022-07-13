const { gql } = require('apollo-server');

module.exports = gql`
  type Query{
    getPosts: [Post]
    getPost(postID: ID!): Post
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postID: ID!): String!
    createComment(postID: ID!, body: String!): Post!
    deleteComment(postID: ID!, commentID: ID!): Post!
    likePost(postID: ID!): Post!
  } 
  type Post{
    id: ID!,
    body: String!,
    username: String!,
    createdAt: String!,
    comments: [Comment]!,
    likes: [Like]!
  }
  type Comment{
    id: ID!,
    body: String!,
    username: String!,
    createdAt: String!,
  }
  type Like{
    id: ID!,
    username: String!,
    createdAt: String!,
  }
  input RegisterInput{
    username: String!
    email: String!
    password: String!
  }
  type User{
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
`;