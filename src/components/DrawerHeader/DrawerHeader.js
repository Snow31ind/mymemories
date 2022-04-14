import { styled } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
