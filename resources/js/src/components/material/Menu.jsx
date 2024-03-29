import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Home from '../Home';
import Inscripcion from '../Inscripcion';
import Nosotros from '../Nosotros';

import './menu.css';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    
    function handleChangeIndex(index) {
     
        setValue(index);
    }
    
    return (
        <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Inicio" {...a11yProps(0)} />
          <Tab label="Registro" {...a11yProps(1)} />
          <Tab label="Nosotros" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className="pt-4 pb-4 fondo-general"
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Home 
            funcIns={() => handleChangeIndex(1)}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Inscripcion />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Nosotros />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
