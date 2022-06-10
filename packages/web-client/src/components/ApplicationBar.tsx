import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import { WEB_CLIENT_HOME, WEB_CLIENT_USERS } from '../pages/urls';

const ApplicationBar = () => {
  const [value, setValue] = useState(WEB_CLIENT_HOME);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<HomeIcon />} label="HOME" value={WEB_CLIENT_HOME} />
              <Tab icon={<PeopleAltIcon />} label="USERS" value={WEB_CLIENT_USERS} />
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Tab icon={<AccountCircleIcon />} label="Account" onClick={handleOpenUserMenu} />
            </Tooltip>
            <Menu
              sx={{ mt: '0px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={0} onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem key={1} onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ApplicationBar;
