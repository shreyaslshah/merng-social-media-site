import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import userImage from '../images/userImage.png'
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';

function PostCard({ post }) {
  const { id, body, username, comments, likes, createdAt } = post;
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={userImage}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={post} />
        <CommentButton post={post} />
        {
          user && user.username === username && (
            <DeleteButton post={post} />
          )
        }
      </Card.Content>
    </Card>
  )
}

export default PostCard