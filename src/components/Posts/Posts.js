import React, { useState } from 'react';
import Post from './Post/Post';
import { CircularProgress, Grid } from '@mui/material';
// Fetch data from the global redux store
import { useSelector } from 'react-redux';

export default function Posts() {
  const { posts, loading } = useSelector((state) => state.posts);

  // Loading state
  if (loading) {
    return (
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
