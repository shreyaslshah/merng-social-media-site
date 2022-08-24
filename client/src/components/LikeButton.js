import React, { useState, useEffect } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

function LikeButton({ post: { likes, id } }) {
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  })

  const basic = user ? (liked ? false : true) : true
  const link = user ? null : Link
  const path = user ? null : '/login'

  return (
    <Popup size='tiny' content='like post' inverted trigger={
      <Button
        onClick={likePost}
        basic={basic}
        size='tiny'
        color='blue'
        icon='heart'
        label={{ color: 'blue', pointing: 'left', content: `${likes.length}` }}
        as={link}
        to={path}
      />
    } />
  )
}

const LIKE_POST_MUTATION = gql`
mutation LikePost($postId: ID!) {
  likePost(postID: $postId) {
    id
    likes {
      username
      id
    }
  }
}
`

export default LikeButton