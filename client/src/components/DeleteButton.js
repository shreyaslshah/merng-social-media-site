import React from 'react'
import { Button } from 'semantic-ui-react'

function DeleteButton() {
  const deletePost = () => {
  }
  return (
    <Button
      as='div'
      color='red'
      onClick={deletePost}
      size='tiny'
      icon='trash'
      floated='right'
    />
  )
}

export default DeleteButton