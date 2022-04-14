import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Delete,
  Edit,
  MoreHoriz,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material';
import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, fetchForm, likePost } from '../../../actions/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Post({ post }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editHandler = (id) => {
    // console.log(id);
    dispatch(fetchForm(id));
  };

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  const likeHandler = (id) => {
    dispatch(likePost(id));
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  const isCreatedByUser =
    user &&
    user.result &&
    (user.result._id === post.creator || user.result.googleId === post.creator);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const openMenu = Boolean(menuAnchorEl);

  const openMenuHandler = (e) => {
    setMenuAnchorEl(e.currentTarget);
  };
  const closeMenuHandler = (e) => {
    setMenuAnchorEl(null);
  };

  const MenuActions = ({ anchorEl, open, onClose }) => {
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem onClick={() => deleteHandler(post._id)}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>

        <MenuItem onClick={() => editHandler(post._id)}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <Card
        elevation={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          borderRadius: 5,
          position: 'relative',
        }}
      >
        <ButtonBase
          component="span"
          onClick={openPost}
          sx={{ display: 'block', zIndex: 0 }}
        >
          <CardMedia
            image={post.selectedFile || '/images/default_media.jpg'}
            title={post.title}
            sx={{
              height: 0,
              paddingTop: '55%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundBlendMode: 'darken',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              color: 'white',
            }}
          >
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="h6">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'white',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px',
            }}
          >
            <Typography variant="body2">
              {post.tags.map((tag) => `#${tag}`)}
            </Typography>
          </Box>
          <Typography
            gutterBottom
            sx={{ padding: '0 16px', fontWeight: 'bold', fontSize: 22 }}
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography sx={{ fontSize: 16 }}>{post.message}</Typography>
          </CardContent>
        </ButtonBase>

        <CardActions
          sx={{
            padding: '0 16px 8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={() => likeHandler(post._id)}>
            {post.likes.findIndex(
              (id) =>
                (user && id === user.result._id) ||
                (user &&
                  user.result &&
                  user.result.googleId &&
                  id === user.result.googleId)
            ) > -1 ? (
              <>
                <ThumbDown />
                &nbsp; Dislike &nbsp; {post.likes.length}
              </>
            ) : (
              <>
                <ThumbUp />
                &nbsp; Like &nbsp; {post.likes.length}
              </>
            )}
          </Button>
          {isCreatedByUser && (
            <Button onClick={openMenuHandler}>
              <MoreHoriz />
            </Button>
          )}
        </CardActions>
      </Card>

      <MenuActions
        open={openMenu}
        anchorEl={menuAnchorEl}
        onClose={closeMenuHandler}
      />
    </>
  );
}
