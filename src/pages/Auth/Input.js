import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

export default function Input(props) {
  const { half, name, changeHandler, label, type, showPasswordHandler } = props;
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        required
        fullWidth
        autoFocus
        type={type}
        label={label}
        name={name}
        onChange={changeHandler}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPasswordHandler}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        variant="outlined"
      />
    </Grid>
  );
}
