import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_POST_MUTATION } from '../mutations';
import { POSTS_QUERY } from '../queries';
import { Post } from '../../types';
import ConfirmDialog from './ConfirmDialog';

interface DeletePostProps {
  postId: string;
}

const DeletePost = ({ postId }: DeletePostProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      id: postId,
    },
    update: (cache) => {
      // update Apollo cache after the post has been successfully deleted
      const data: any = cache.readQuery({ query: POSTS_QUERY });
      cache.writeQuery({
        query: POSTS_QUERY,
        data: {
          posts: data.posts.filter((post: Post) => post.id !== postId),
        },
      });
    },
  });

  const handleClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirm = (isConfirmed: boolean) => {
    setIsConfirmDialogOpen(false);

    if (isConfirmed) {
      deletePost();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClick}
        sx={{ pr: '0px' }}
      >
        &nbsp;
      </Button>
      <ConfirmDialog
        title="Delete Post"
        text="Are you sure you want to delete this post?"
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirm}
      />
    </>
  );
};

export default DeletePost;
