import React, { useContext } from 'react';
import { Button, Card, CardActions, CardContent, Tooltip, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { Post } from '../../../types';
import { AuthContext } from '../../../context/AuthProvider';
import LikePost from '../../components/LikePost';
import { Link } from 'react-router-dom';
import { WEB_CLIENT_POST, WEB_CLIENT_ROOT } from '../../urls';
import DeletePost from '../../components/DeletePost';
import { getDurationAsText } from '../../helpers';

const TEXT_MAX_LENGTH = 50;

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useContext(AuthContext);

  const { id: postId, text, createdAt, author, likes, comments } = post;

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
          {getDurationAsText(createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`${WEB_CLIENT_ROOT}${WEB_CLIENT_POST}/${postId}`}
          style={{ textDecoration: 'none' }}
        >
          <Button size="small">Read Post</Button>
        </Link>
      </CardActions>
      <CardActions>
        <LikePost postId={postId} likes={likes} />
        <Link
          to={`${WEB_CLIENT_ROOT}${WEB_CLIENT_POST}/${postId}`}
          style={{ textDecoration: 'none' }}
        >
          <Tooltip title="Add comment" arrow>
            <Button
              variant="outlined"
              startIcon={<ForumIcon />}
              onClick={handleCommentButtonClick}
              sx={{ ml: 1 }}
            >
              {comments.length}
            </Button>
          </Tooltip>
        </Link>
        {user && user.username === author?.username && <DeletePost postId={postId} />}
      </CardActions>
    </Card>
  );
};

export default PostCard;
