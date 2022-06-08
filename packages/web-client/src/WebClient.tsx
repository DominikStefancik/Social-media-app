import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';
import NotFound from './pages/not-found';
import Register from './pages/register';
import {
  WEB_CLIENT_HOME,
  WEB_CLIENT_LOGIN,
  WEB_CLIENT_LOGOUT,
  WEB_CLIENT_NOT_FOUND,
  WEB_CLIENT_REGISTER,
} from './pages/urls';

const WebClient = () => {
  return (
    <Routes>
      <Route path={WEB_CLIENT_HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={WEB_CLIENT_LOGIN} element={<Login />} />
        <Route path={WEB_CLIENT_LOGOUT} element={<Logout />} />
        <Route path={WEB_CLIENT_REGISTER} element={<Register />} />

        <Route path={WEB_CLIENT_NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={WEB_CLIENT_NOT_FOUND} replace />} />
      </Route>
    </Routes>
  );
};

export default WebClient;
