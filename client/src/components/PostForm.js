import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

function PostForm() {
  const [values, setValues] = useState({
    body: '',
  })
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    update(cache, result) {
      console.log(result);
      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY
      });
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      })
      setValues({ ...values, body: '' });
    },
    onError(err) {
      console.log(err);
    },
    variables: values
  })
  const onSubmit = (e) => {
    e.preventDefault();
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input placeholder="body..." name="body" onChange={onChange} value={values.body} error={error ? true : false}></Form.Input>
          <Button type='submit' color='blue'>
            Submit
          </Button>
        </Form.Field>
      </Form>
      {
        error && (
          <div className='ui error message' style={{marginBottom: "10px"}}>
            <ul className='list'>
              <li>
                {error.graphQLErrors[0].message}
              </li>
            </ul>
          </div>
        )
      }
    </>

  )
}

const CREATE_POST_MUTATION = gql`
mutation CreatePost($body: String!) {
  createPost(body: $body) {
    id
    body
    username
    createdAt
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

export default PostForm