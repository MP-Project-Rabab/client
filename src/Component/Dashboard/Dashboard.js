import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material/";
import PropTypes from "prop-types";
import Product from "../notApproved/Product";
import Posts from "../notApproved/Posts";
import User from "../Account/User/User";
import "./style.css";
// End of import all dependencies

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="منشورات تحتاج للموافقه" {...a11yProps(0)} />
        <Tab label="منتجات تحتاج للموافقه" {...a11yProps(1)} />
        <Tab label="المستخدمين" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Product />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <User />
      </TabPanel>
    </Box>
  );
};

export default Dashboard;
