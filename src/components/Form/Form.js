import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import { StyledForm } from '../StyledComponents/StyledForm';

const initialPostData = {
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};

export default function Form() {
  const dispatch = useDispatch();
  // const state = useSelector((state) => (state.post ? state.post : null));
  // const { loading, post } = state;

  const { loading, form, post } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const [postData, setPostData] = useState(initialPostData);

  useEffect(() => {
    if (form) {
      setPostData({
        creator: form.creator,
        title: form.title,
        message: form.message,
        tags: form.tags,
        selectedFile: form.selectedFile,
      });
    } else {
      setPostData(initialPostData);
    }
  }, [form]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (form) {
      dispatch(updatePost(form._id, postData, navigate));

      console.log(postData);
    } else {
      dispatch(
        createPost(
          {
            ...postData,
            tags: postData.tags.split(',').map((tag) => tag.toLowerCase()),
            name: user.result.name || null,
          },
          navigate
        )
      );
    }

    clearHandler();
  };

  const clearHandler = () => {
    setPostData(initialPostData);
  };

  if (loading) {
    return (
      <Paper>
        <CircularProgress />
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper>
        <Typography>Please login to create your new memories</Typography>
      </Paper>
    );
  }
  return (
    <Paper sx={{ padding: 2 }}>
      <StyledForm autoComplete="off" noValidate onSubmit={submitHandler}>
        {form ? (
          <Typography>Editing a memory</Typography>
        ) : (
          <Typography>Creating a memory</Typography>
        )}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Box>
        <Button
          size="large"
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {form ? 'Save' : 'Add'}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={clearHandler}
          fullWidth
          sx={{ mt: 1 }}
        >
          Clear
        </Button>
      </StyledForm>
    </Paper>
  );
}
