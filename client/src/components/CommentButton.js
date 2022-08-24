import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function CommentButton({ post: { comments, id } }) {
  const commentPost = () => {
  }
  return (
    <Popup size='tiny' inverted content='comment' trigger={
      <Button
        onClick={commentPost}
        as={Link}
        to={`/posts/${id}`}
        basic
        size='tiny'
        color='blue'
        icon='comment'
        label={{ basic: true, color: 'blue', pointing: 'left', content: `${comments.length}` }}
      />
    } />
  )
}

export default CommentButton