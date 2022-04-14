import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import DrawerHeader from './components/DrawerHeader/DrawerHeader';
import AppRoutes from './routes/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <DrawerHeader />

        <Box sx={{ minHeight: '150vh' }}>
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
