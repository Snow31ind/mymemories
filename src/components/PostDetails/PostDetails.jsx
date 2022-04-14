import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost, fetchPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection/CommentSection';

export default function PostDetails() {
  const { post, posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id]);

  useEffect(() => {
    // console.log(`post = ${post}`);
    dispatch(fetchPostsBySearch({ search: '', tags: '' }));
  }, [id]);

  if (!post) return null;

  if (loading) {
    return (
      <Paper>
        <CircularProgress />
      </Paper>
    );
  }

  const openPost = (id) => navigate(`/posts/${id}`, { replace: true });

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  console.log(posts);
  console.log(recommendedPosts);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Box sx={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box
          sx={{
            marginLeft: '20px',
          }}
        >
          <img
            src={post.selectedFile || '/images/default_media.jpg'}
            alt={post.title}
            width={400}
          />
        </Box>
      </Box>
      {recommendedPosts.length && (
        <Box>
          <Typography gutterBottom variant="h5">
            You might also like
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {recommendedPosts.map((recommendedPost) => (
              <Box
                key={recommendedPost._id}
                sx={{
                  m: 2,
                  cursor: 'pointer',
                }}
                onClick={() => openPost(recommendedPost._id)}
              >
                <Typography gutterBottom variant="h6">
                  {recommendedPost.title}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {recommendedPost.name}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {recommendedPost.message}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {recommendedPost.likes.length}
                </Typography>
                <img
                  src={
                    recommendedPost.selectedFile || '/images/default_media.jpg'
                  }
                  alt={recommendedPost.title}
                  width="200px"
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
}
