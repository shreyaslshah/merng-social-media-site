import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Card, Form, Grid, Image, Loader } from 'semantic-ui-react';
import userImage from '../images/userImage.png'
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import CommentButton from '../components/CommentButton';
import DeleteButton from '../components/DeleteButton';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function SinglePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: id }
  })
  var post = null;
  if (data) {
    post = data.getPost;
  }

  const [comment, setComment] = useState('');

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
      document.getElementById('commentInput').blur();
    },
    variables: {
      postId: id,
      body: comment
    }
  })

  function deletePostCallBack() {
    navigate('/');
  }


  return (loading ? (
    <Loader active inline='centered'>Loading Post</Loader>
  ) : (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src={userImage}
            size='small'
            float='right'
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{post.username}</Card.Header>
              <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton post={post} />
              <CommentButton post={post} />
              {user && user.username === post.username && <DeleteButton post={post} callBack={deletePostCallBack} />}
            </Card.Content>
          </Card>
          {
            user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        id='commentInput'
                        type="text"
                        placeholder='comment...'
                        name='comment'
                        value={comment}
                        onChange={e => setComment(e.target.value)} />
                      <button
                        type='submit'
                        className='ui button blue'
                        disabled={comment.trim() === ''}
                        onClick={createComment}>
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )
          }
          {
            post.comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton post={post} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ))
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

const CREATE_COMMENT_MUTATION = gql`
mutation CreateComment($postId: ID!, $body: String!) {
  createComment(postID: $postId, body: $body) {
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

export default SinglePost