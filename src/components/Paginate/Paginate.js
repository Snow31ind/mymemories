import { Pagination, PaginationItem } from '@mui/material';
import React, { useEffect } from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../actions/posts';

export default function Paginate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { page } = props;
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{
        ul: classes.ul,
      }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="secondary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
}
