import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BuildIcon from '@material-ui/icons/Build';

import Principal from './Principal';
import Footer from '../Footer';
import TeamView from './TeamView';

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
        backgroundColor: '#FFF', //ESTO ES EL DIV DE ABAJO DEL MENU
        
    },
}));

function UserView() {
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
      <AppBar position="static" className="bg-dark">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          className="text-white"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Inicio" {...a11yProps(0)} />
          <Tab label="Team" {...a11yProps(1)} />
          <Tab label="Info" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className=""
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Principal />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
 
            <div className="alert-danger p-2 m-3 rounded text-center"> 
                <h1>Seccion en construccion <BuildIcon /></h1>
                <p>Pronto estaremos cargando la seccion de Team para que puedan crear su equipo para el torneo oficial</p>
            </div>
{/**

            <TeamView />
 */}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="alert-danger p-2 m-3 rounded text-center"> 
                <h1>Seccion en construccion <BuildIcon /></h1>
                <p>Aqui podran ver sus estadisticas personales y los torneos en los que participaron dentro de <strong>TryHigh</strong></p>
            </div>
        </TabPanel>
      </SwipeableViews>
      <Footer />
    </div>
  );
}

if(document.getElementById('UserView')){
    ReactDOM.render(
        <UserView />  , 
        document.getElementById('UserView')
    );
}
