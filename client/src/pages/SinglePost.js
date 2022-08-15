import React from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

function SinglePost() {
  const { id } = useParams();
  const {data} = useQuery(FETCH_POST_QUERY, {
    variables: { postId: id }
  })
  console.log(data);
  return (
    <div>SinglePost</div>
  )
}

const FETCH_POST_QUERY = gql`
query GetPost($postId: ID!) {
  getPost(postID: $postId) {
    id
    body
    username
    comments {
      id
      body
      username
      createdAt
    }
    createdAt
    likes {
      id
      username
      createdAt
    }
  }
}

`

export default SinglePost