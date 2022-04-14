import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostDetails from '../components/PostDetails/PostDetails';
import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';

const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const routes = [
    {
      path: '/',
      caseSensitive: true,
      element: <Navigate to="/posts" replace={true} />,
    },
    {
      path: '/posts',
      caseSensitive: true,
      element: <Home />,
    },
    {
      path: '/posts/search',
      caseSensitive: true,
      element: <Home />,
    },
    {
      path: '/posts/:id',
      caseSensitive: true,
      element: <PostDetails />,
    },
    {
      path: '/auth',
      caseSensitive: true,
      element: user ? <Navigate to="/posts" replace={true} /> : <Auth />,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
