import { Box, Grid, Grow, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import Paginate from '../../components/Paginate/Paginate';
import { useLocation } from 'react-router-dom';
import SearchEngine from '../../components/SearchEngine/SearchEngine';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const dispatch = useDispatch();
  const { refreshCount } = useSelector((state) => state.posts);

  const query = useQuery();
  const page = query.get('page') || 1;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [refreshCount, dispatch]);

  return (
    <Grow in>
      <Box
        sx={{
          pl: 10,
          pr: 10,
          pt: 2,
        }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={2}
          sx={{}}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SearchEngine />
            <Form />
            <Paper elevation={5}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
}