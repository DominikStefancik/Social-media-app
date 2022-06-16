import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/components/Layout';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import Logout from './pages/logout';
import NotFoundPage from './pages/not-found';
import PostPage from './pages/post';
import RegisterPage from './pages/register';
import {
  WEB_CLIENT_ROOT,
  WEB_CLIENT_LOGIN,
  WEB_CLIENT_LOGOUT,
  WEB_CLIENT_NOT_FOUND,
  WEB_CLIENT_REGISTER,
  WEB_CLIENT_HOME,
  WEB_CLIENT_POST,
} from './pages/urls';

const WebClient = () => {
  return (
    <Routes>
      <Route path={WEB_CLIENT_ROOT} element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path={WEB_CLIENT_LOGIN} element={<LoginPage />} />
        <Route path={WEB_CLIENT_LOGOUT} element={<Logout />} />
        <Route path={WEB_CLIENT_REGISTER} element={<RegisterPage />} />
        <Route path={WEB_CLIENT_HOME} element={<HomePage />} />
        <Route path={WEB_CLIENT_POST}>
          <Route path=":postId" element={<PostPage />} />
        </Route>

        <Route path={WEB_CLIENT_NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={WEB_CLIENT_NOT_FOUND} replace />} />
      </Route>
    </Routes>
  );
};

export default WebClient;
