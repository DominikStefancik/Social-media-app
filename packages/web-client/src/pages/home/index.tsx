import React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';

import { CircularProgress, Grid, Paper } from '@mui/material';

import { POSTS_QUERY } from '../queries';
import ApplicationBar from '../../components/ApplicationBar';
import { Post } from './types';
import PostCard from './components/PostCard';

// @ts-ignore
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const { loading, data } = useQuery(POSTS_QUERY);

  return (
    <div>
      <ApplicationBar />
      <Grid container spacing={1} rowSpacing={2}>
        <Grid container item columns={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={2} sm={4} md={4} key={0} style={{ textAlign: 'center' }}>
            <h1>Recent Posts</h1>
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

export default Home;
