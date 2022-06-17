import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../../context/AuthProvider';
import { LIKE_POST_MUTATION } from '../mutations';
import { getLikesTooltip } from '../helpers';

interface LikePostProps {
  postId: string;
  likes: string[];
}

const LikePost = ({ postId, likes }: LikePostProps) => {
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    setIsLiked(!!(user && likes.find((like) => like === user.username)));
    setTooltipText(getLikesTooltip(likes));
  }, [likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      id: postId,
    },
    // Note: We don't need to update the Apollo cache after we have called the "likePost" mutation
    // The reason is that in the mutation we have specified "id" field as a return value and because of this
    // the Apollo updates automatically all the post's fields we specified as a return value
  });

  const handleClick = () => {
    likePost();
  };

  return (
    <Tooltip title={tooltipText} arrow>
      <Button
        variant={isLiked ? 'contained' : 'outlined'}
        color="secondary"
        startIcon={<FavoriteIcon />}
        onClick={handleClick}
      >
        {likes.length}
      </Button>
    </Tooltip>
  );
};

export default LikePost;
