import React, { useState } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

function DeleteButton({ post, callBack, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    variables: {
      postId: post.id,
      commentId: commentId
    },
    update(cache, result) {
      setConfirmOpen(false);
      if (callBack) {
        callBack();
      }
      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY
        });
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter(p => p.id !== post.id)
          }
        })
      }
    }
  })

  return (
    <>
      <Button
        as='div'
        color='red'
        onClick={() => setConfirmOpen(true)}
        size='tiny'
        icon='trash'
        floated='right'
      />
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} content='Are you sure you want to delete this?' />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postID: $postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation DeleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postID: $postId, commentID: $commentId) {
    comments {
      body
    }
    id
    body
    username
    createdAt
    likes {
      id
      username
      createdAt
    }
  }
}
`

const FETCH_POSTS_QUERY = gql`
query GetPosts {
  getPosts {
    id
    body
    username
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    createdAt
  }
}`

export default DeleteButton