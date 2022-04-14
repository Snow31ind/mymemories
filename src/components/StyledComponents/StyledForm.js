import { styled } from '@mui/material';

export const StyledForm = styled('form')(({ theme }) => ({
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
  display: 'flex',
  flexDirection: 'columns',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));
