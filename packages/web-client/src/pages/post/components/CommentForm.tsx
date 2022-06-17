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
import AddCommentIcon from '@mui/icons-material/AddComment';
import React, { FormEvent, useState } from 'react';
import { CREATE_COMMENT_MUTATION } from '../../mutations';

interface CreateCommentProps {
  postId: string;
}

const CommentForm = ({ postId }: CreateCommentProps) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // in order to update the Apollo cache without an error after the mutation is finished,
  // the mutation 'CREATE_COMENT_MUTATION' must return the same fields as the query 'POSTS_QUERY'
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId,
      text,
    },
    // the update function will be run after the the mutation successfully finishes
    update(cache, result) {
      // reset the input and error
      setText('');
      setError('');
    },
    onError(error: ApolloError) {
      setError(error.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createComment();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" paragraph>
            New Comment
          </Typography>
          <TextField
            margin="normal"
            required
            id="comment"
            label="New Comment"
            name="comment"
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
            startIcon={<AddCommentIcon />}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Add Comment
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentForm;
