import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { POSTS_QUERY } from '../queries';
import ApplicationBar from '../components/application-bar/ApplicationBar';
import { Post } from '../../types';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';

const HomePage = () => {
  const { loading, data } = useQuery(POSTS_QUERY);

  return (
    <div>
      <ApplicationBar />
      <Grid container spacing={1} rowSpacing={2}>
        <Grid container item columns={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={2} sm={4} md={4} key={0}>
            <PostForm />
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div" align="center" paragraph>
              Recent Posts
            </Typography>
          </Grid>
        </Grid>
        <Grid container item spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {loading ? (
            <div>
              Loading... <CircularProgress />
            </div>
          ) : (
            data &&
            data.posts.map((post: Post, index: number) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostCard post={post} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
