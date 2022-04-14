import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../actions/posts';

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentRef = useRef();

  const commentHandler = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(post._id, finalComment));

    setComment('');
    setComments(newComments);

    scrollHandler();
  };

  const scrollHandler = () => {
    commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const isUserLoggedIn = user && user.result && user.result.name;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            height: '200px',
            overflowY: 'auto',
            marginRight: '30px',
          }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, idx) => (
            <Typography key={idx} gutterBottom variant="subtitle1">
              <strong>{comment.split(': ')[0]}</strong>
              {comment.split(': ')[1]}
            </Typography>
          ))}
          <Box ref={commentRef} />
        </Box>
        {isUserLoggedIn && (
          <Box sx={{ width: '60%' }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={3}
              name=""
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              fullWidth
              color="secondary"
              disabled={!comment.length}
              variant="contained"
              onClick={commentHandler}
            >
              Comment
            </Button>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={scrollHandler}
            >
              Scroll
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommentSection;
