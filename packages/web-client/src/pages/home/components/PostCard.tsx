import React, { useContext } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateTime } from 'luxon';

import { Post } from '../../../types';
import { AuthContext } from '../../../context/AuthProvider';
import LikeButton from './LikeButton';

const TEXT_MAX_LENGTH = 50;

interface PostCardProps {
  post: Post;
}

const getPostDuration = (date: string): string => {
  const dateTime = DateTime.fromISO(date);
  const duration = DateTime.now().diff(dateTime, ['years', 'months', 'days', 'hours', 'minutes']);
  const minutes = Math.floor(duration.minutes);
  let durationString;

  if (duration.years > 0) {
    durationString = `${duration.years} year${duration.years > 1 ? 's' : ''} ago`;
  } else if (duration.months > 0) {
    durationString = `${duration.months} month${duration.months > 1 ? 's' : ''} ago`;
  } else if (duration.days > 0) {
    durationString = `${duration.days} day${duration.days > 1 ? 's' : ''} ago`;
  } else if (duration.hours > 0) {
    durationString = `${duration.hours} hour${duration.hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    durationString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    durationString = 'Less than a minute ago';
  }

  return durationString;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useContext(AuthContext);

  const { id, text, createdAt, author, likes, comments } = post;

  const handleCommentButtonClick = () => {
    console.log('Comment Button Clicked');
  };

  const handleDeleteButtonClick = () => {
    console.log('Delete Button Clicked');
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div" paragraph>
          {author ? author.username : 'Deleted User'}
        </Typography>
        <Typography variant="body2" paragraph>
          {text.length > 50 ? `${text.substring(0, TEXT_MAX_LENGTH)}...` : text}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" component="div">
          {getPostDuration(createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read Post</Button>
      </CardActions>
      <CardActions>
        <LikeButton postId={id} likes={likes} />
        <Button variant="outlined" startIcon={<ForumIcon />} onClick={handleCommentButtonClick}>
          {comments.length}
        </Button>
        {user && user.username === author?.username && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteButtonClick}
            sx={{ pr: '0px', align: 'right' }}
          >
            &nbsp;
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PostCard;
