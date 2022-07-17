import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import moment from 'moment';

function PostCard({ post }) {
  const { id, body, username, comments, likes, createdAt } = post;
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://pps.whatsapp.net/v/t61.24694-24/183330444_681043693215620_4231573595976245233_n.jpg?ccb=11-4&oh=01_AVwfnv1K9cZhCMaJE969LdizJaPeKeGPFC_E4WA0hHXiNg&oe=62E4B13E'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>click to send compliment</p>
      </Card.Content>
    </Card>
  )
}

export default PostCard