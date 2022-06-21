import { ApolloError, useMutation } from '@apollo/client';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { FormEvent, useState } from 'react';
import { CREATE_POST_MUTATION } from '../../mutations';
import { POSTS_BATCH_QUERY } from '../../queries';
import { POSTS_COUNT_PER_PAGE } from '../../helpers';

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
      const data: any = cache.readQuery({
        query: POSTS_BATCH_QUERY,
        variables: {
          offset: 1,
          limit: POSTS_COUNT_PER_PAGE,
        },
      });
      cache.writeQuery({
        query: POSTS_BATCH_QUERY,
        data: {
          posts: {
            ...data.posts,
            items: [...data.posts.items, result.data.createPost],
          },
        },
      });

      // reset the input and errors
      setText('');
      setError('');
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
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" paragraph>
            New Post
          </Typography>
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
            sx={{ width: '100%' }}
          />
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            size="large"
            variant="contained"
            startIcon={<PostAddIcon />}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Add Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostForm;
