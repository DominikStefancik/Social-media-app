import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import { DateTime } from 'luxon';

import { Post } from '../../../types';

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
  const { text, createdAt, author, likes } = post;

  const handleLikeButtonClick = () => {
    console.log('Like Button Clicked');
  };

  const handleCommentButtonClick = () => {
    console.log('Comment Button Clicked');
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
        <Button
          variant="outlined"
          color="error"
          startIcon={<FavoriteIcon />}
          onClick={handleLikeButtonClick}
        >
          {likes.length}
        </Button>
        <Button variant="outlined" startIcon={<ForumIcon />} onClick={handleCommentButtonClick}>
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
