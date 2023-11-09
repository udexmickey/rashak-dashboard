'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomPaginationActionsTable from '@/components/ui/users.table';
import AdminTable from '@/components/ui/admins.table';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
  //   id: `simple-tab-${index}`,
  //   'aria-controls': `simple-tabpanel-${index}`,
  // };
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
};
}

export default function UserManagement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
    <Tabs 
    value={value} 
    TabIndicatorProps={{style: {background:'#00A651'}}}
    // onChange={handleChange} 
    // aria-label="basic tabs example"
    // value={value}
    onChange={handleChange}
    // indicatorColor="secondary"
    textColor="inherit"
    variant="fullWidth"
    aria-label="full width tabs example"
    >
      <Tab label="Manage Admins" {...a11yProps(0)} className='text-[#484848] text-lg capitalize' style={{ flexBasis: '100%' }} />
      <Tab label="Admin Requests" {...a11yProps(1)} className='text-[#484848] text-lg capitalize' style={{ flexBasis: '100%' }} />
    </Tabs>
  </Box>
  <CustomTabPanel value={value} index={0}>
    <AdminTable />
  </CustomTabPanel>
  <CustomTabPanel value={value} index={1}>
    <CustomPaginationActionsTable />
  </CustomTabPanel>
</Box>

  );
}
