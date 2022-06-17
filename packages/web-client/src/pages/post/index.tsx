import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { POST_QUERY } from '../queries';
import { AuthContext } from '../../context/AuthProvider';
import { getDurationAsText } from '../helpers';
import LikePost from '../components/LikePost';
import DeletePost from '../components/DeletePost';
import ApplicationBar from '../components/application-bar/ApplicationBar';
import { Comment } from '../../types';
import DeleteComment from '../components/DeleteComment';
import CommentForm from './components/CommentForm';

const PostPage = () => {
  const { user } = useContext(AuthContext);
  let { postId } = useParams();

  const { loading, data } = useQuery(POST_QUERY, {
    variables: {
      id: postId,
    },
  });

  return (
    <>
      <ApplicationBar />
      {loading ? (
        <div>
          Loading post... <CircularProgress />
        </div>
      ) : (
        data && (
          <>
            <Card sx={{ minWidth: 275, mt: 1 }}>
              <CardContent>
                <Typography variant="h6" component="div" paragraph>
                  {data.post.author ? data.post.author.username : 'Deleted User'}
                </Typography>
                <Typography variant="body2" paragraph>
                  {data.post.text}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" component="div">
                  {getDurationAsText(data.post.createdAt)}
                </Typography>
              </CardContent>
              <CardActions>
                <LikePost postId={data.post.id} likes={data.post.likes} />
                <Button variant="outlined" startIcon={<ForumIcon />} sx={{ ml: 1 }}>
                  {data.post.comments.length}
                </Button>
                {user && user.username === data.post.author?.username && (
                  <DeletePost postId={data.post.id} />
                )}
              </CardActions>
            </Card>
            <CommentForm postId={data.post.id} />
            {data.post.comments.map((comment: Comment, index: number) => (
              <Card sx={{ minWidth: 275, mt: 1 }} key={index}>
                <CardContent>
                  <Typography variant="h6" component="div" paragraph>
                    {comment.author ? comment.author.username : 'Deleted User'}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {comment.text}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" component="div">
                    {getDurationAsText(comment.createdAt)}
                  </Typography>
                </CardContent>
                <CardActions>
                  {user && user.username === comment.author?.username && (
                    <DeleteComment postId={data.post.id} commentId={comment.id} />
                  )}
                </CardActions>
              </Card>
            ))}
          </>
        )
      )}
    </>
  );
};

export default PostPage;
