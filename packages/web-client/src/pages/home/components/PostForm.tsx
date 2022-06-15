import { ApolloError, useMutation } from '@apollo/client';
import { Box, Button, Grid, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { FormEvent, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../mutations';
import { POSTS_QUERY } from '../../queries';

const PostForm = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // in order to update the Apollo cache without an error after the mutation is finished,
  // the mutation 'CREATE_POST_MUTATION' must return the same fields as the query 'POSTS_QUERY'
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      text,
    },
    // the update function will be run after the the mutation successfully finishes
    // it is usually used for updating the Apollo cache
    update(cache, result) {
      // update Apollo cache with the all posts including the one we have successfully created
      const data: any = cache.readQuery({ query: POSTS_QUERY });
      cache.writeQuery({
        query: POSTS_QUERY,
        data: {
          posts: [...data.posts, result.data.createPost],
        },
      });

      // reset the in
      setText('');
    },
    onError(error: ApolloError) {
      setError(error.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3, mb: 3, justifyItems: 'center' }}
    >
      <Grid container item columns={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={2} sm={4} md={4} key={0} sx={{ textAlign: 'center' }}>
          <h1>New Post</h1>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={1} sx={{ justifyContent: 'middle' }}>
          <TextField
            margin="normal"
            required
            id="post"
            label="New Post"
            name="post"
            multiline
            rows={4}
            value={text}
            error={!!error}
            onChange={(event) => setText(event.target.value)}
            sx={{ width: '77%' }}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ ml: 3, mt: 3, width: '20%' }}
            disabled={loading}
            startIcon={<PostAddIcon />}
          >
            Create Post
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;
