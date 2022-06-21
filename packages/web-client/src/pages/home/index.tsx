import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, Grid, Pagination, Typography } from '@mui/material';
import { POSTS_BATCH_QUERY } from '../queries';
import ApplicationBar from '../components/application-bar/ApplicationBar';
import { Post } from '../../types';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import { POSTS_COUNT_PER_PAGE } from '../helpers';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const { loading, data } = useQuery(POSTS_BATCH_QUERY, {
    variables: {
      offset: page,
      limit: POSTS_COUNT_PER_PAGE,
    },
    onCompleted: (data) => {
      setTotalCount(Math.ceil(data.posts.totalCount / POSTS_COUNT_PER_PAGE));
    },
  });

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

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
            data.posts.items.map((post: Post, index: number) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <PostCard post={post} />
              </Grid>
            ))
          )}
        </Grid>
        {data && (
          <Grid item xs={2} sm={4} md={4} key="pagination" sx={{ mt: 4, mb: 4 }}>
            <Pagination
              color="primary"
              variant="outlined"
              count={totalCount}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
