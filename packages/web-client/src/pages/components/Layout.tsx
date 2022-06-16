import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

const Layout = () => {
  // the Outlet component represents all components nested in the Container component
  return (
    <div>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
