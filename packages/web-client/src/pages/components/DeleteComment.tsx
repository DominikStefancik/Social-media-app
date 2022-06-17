import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_COMMENT_MUTATION } from '../mutations';
import ConfirmDialog from './ConfirmDialog';

interface DeleteCommentProps {
  postId: string;
  commentId: string;
}

const DeleteComment = ({ postId, commentId }: DeleteCommentProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      postId,
      commentId,
    },
    // Note: We don't need to update the Apollo cache after we have called the "deleteComment" mutation
    // The reason is that in the mutation we have specified "id" field as a return value and because of this
    // the Apollo updates automatically all the post's fields we specified as a return value
  });

  const handleClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirm = (isConfirmed: boolean) => {
    setIsConfirmDialogOpen(false);

    if (isConfirmed) {
      deleteComment();
    }
  };

  return (
    <>
      <Tooltip title="Delete comment" arrow>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleClick}
          sx={{ pr: '0px' }}
        >
          &nbsp;
        </Button>
      </Tooltip>
      <ConfirmDialog
        title="Delete Comment"
        text="Are you sure you want to delete this comment?"
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirm}
      />
    </>
  );
};

export default DeleteComment;
