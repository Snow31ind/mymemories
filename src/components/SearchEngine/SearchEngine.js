import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostsBySearch } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

const SearchEngine = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const pressHandler = (e) => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const addTagHandler = (value) => {
    setTags(value);
  };

  const searchHandler = () => {
    if (search.trim() || tags.length) {
      console.log(search, tags);
      const searchQuery = search || '';
      const tagsQuery = tags.join(',') || '';
      // console.log(searchQuery, tagsQuery);

      dispatch(fetchPostsBySearch({ search: searchQuery, tags: tagsQuery }));
      navigate(`/posts/search?searchQuery=${searchQuery}&tags=${tagsQuery}`);
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
        '& .MuiTextField-root': {
          mb: 1,
        },
      }}
    >
      <TextField
        fullWidth
        name="search"
        variant="outlined"
        label="Search Memories"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={pressHandler}
      />
      <Autocomplete
        multiple
        freeSolo
        options={tags}
        renderInput={(params) => (
          <TextField {...params} label="Search by tags" />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        value={tags}
        onChange={(e, newValue) => addTagHandler(newValue)}
      />

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={searchHandler}
      >
        Search
      </Button>
      {tags.map((tag) => (
        <Typography key={tag}>{tag}</Typography>
      ))}

      <Typography>{search}</Typography>
    </AppBar>
  );
};

export default SearchEngine;
