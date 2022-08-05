import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const { id, body, username, comments, likes, createdAt } = post;

  const likePost = () => {
    console.log('like post');
  }
  const commentPost = () => {
    console.log('comment post');
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://media-exp1.licdn.com/dms/image/C5603AQEM2DDbhmY7Ig/profile-displayphoto-shrink_200_200/0/1650983999584?e=1660176000&v=beta&t=n_ZdSqIIgk0FfpbiLcsB0AXEW1P2FeBBCcFTirdjuxU'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={likePost}
          basic
          size='tiny'
          color='blue'
          icon='heart'
          label={{ basic: true, color: 'blue', pointing: 'left', content: `${likes.length}` }}
        />
        <Button
          onClick={commentPost}
          basic
          size='tiny'
          color='blue'
          icon='comment'
          label={{ basic: true, color: 'blue', pointing: 'left', content: `${comments.length}` }}
        />
      </Card.Content>
    </Card>
  )
}

export default PostCard