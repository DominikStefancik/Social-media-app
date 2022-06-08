import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { WEB_CLIENT_HOME, WEB_CLIENT_USERS } from '../urls';

const MenuBar = () => {
  const [value, setValue] = React.useState(WEB_CLIENT_HOME);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab icon={<HomeIcon />} label="HOME" value={WEB_CLIENT_HOME} />
      <Tab icon={<PeopleAltIcon />} label="USERS" value={WEB_CLIENT_USERS} />
    </Tabs>
  );
};

export default MenuBar;
