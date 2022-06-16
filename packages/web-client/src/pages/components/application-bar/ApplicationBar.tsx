import React, { MouseEvent, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { WEB_CLIENT_HOME, WEB_CLIENT_ROOT, WEB_CLIENT_USERS } from '../../urls';
import { ButtonLabel, MenuItemLabel } from './types';
import { AuthContext } from '../../../context/AuthProvider';
import ConfirmDialog from '../ConfirmDialog';

const ApplicationBar = () => {
  const [value, setValue] = useState(WEB_CLIENT_HOME);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: SyntheticEvent) => {
    setAnchorElUser(null);
    const value = (event.target as HTMLElement).getAttribute('value');

    switch (value) {
      case MenuItemLabel.PROFILE:
        console.log('Clicked Profile');
        break;
      case MenuItemLabel.LOGOUT:
        setIsConfirmDialogOpen(true);
        break;
      default:
        break;
    }
  };

  const handleTabChange = (_: any, newValue: string) => {
    setValue(newValue);
  };

  const handleCloseConfirm = (isConfirmed: boolean) => {
    setIsConfirmDialogOpen(false);

    if (isConfirmed) {
      authContext.clearUser();
      navigate(WEB_CLIENT_ROOT, { replace: true });
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Tabs value={value} onChange={handleTabChange}>
                <Tab icon={<HomeIcon />} label={ButtonLabel.HOME} value={WEB_CLIENT_HOME} />
                <Tab icon={<PeopleAltIcon />} label={ButtonLabel.USERS} value={WEB_CLIENT_USERS} />
              </Tabs>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Tab
                  icon={<AccountCircleIcon />}
                  label={ButtonLabel.ACCOUNT}
                  onClick={handleOpenUserMenu}
                />
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
                <MenuItem key={0} onClick={handleCloseUserMenu} value={MenuItemLabel.PROFILE}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  {MenuItemLabel.PROFILE}
                </MenuItem>
                <MenuItem key={1} onClick={handleCloseUserMenu} value={MenuItemLabel.LOGOUT}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {MenuItemLabel.LOGOUT}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ConfirmDialog
        title="Logout"
        text="Are you sure you want to logout?"
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirm}
      />
    </>
  );
};

export default ApplicationBar;
