import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client/react/hooks';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  var posts = null;
  if (data) {
    posts = data.getPosts;
  }
  console.log(posts);
  console.log(data);
  return (
    <Grid columns={3} >
      <Grid.Row>
        <h1>
          Recent Posts
        </h1>
      </Grid.Row>
      <Grid.Row>
        {
          loading ? (<h1>Loading Posts...</h1>) :
            (
              posts &&
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )
        }
      </Grid.Row>
    </Grid >
  )
}

const FETCH_POSTS_QUERY = gql`
{
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

export default Home