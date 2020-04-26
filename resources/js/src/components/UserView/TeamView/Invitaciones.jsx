import React from 'react';
import { Grid, makeStyles, Collapse, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    root:{
        border: '2px solid #c39031',
        padding: 15,
        color: '#cb9738',
        fontFamily: 'nasalization',
        background: 'rgba(0,0,0,0.7)'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: "1s",
      },
    expandOpen: {
        transform: 'rotate(180deg)',
        fontSize: 50,
        color: '#FFF'
    },
    paper:{
        width: '100%',
        padding:10,
    },
    deleteIcon:{
        color: 'red',
        '&:hover':{
            cursor:'pointer',
        }
    }
}))
export default function Invitaciones(){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [invitations, setInvitations] = React.useState([]);

    const getInvitations = () => {
        fetch('/Invitation')
        .then(response => response.json())
        .then(info => {            
            setInvitations(info);
        });
    }
    React.useEffect(() => {
        getInvitations();
    },[]);

    const deleteInvitation = (id) => {
        let invs = invitations;
        
    }
    return(
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.root}
        >
            <Grid item>
                <h3>Invitaciones <ExpandMoreIcon 
                                                className={clsx(classes.expand, {[classes.expandOpen]: expanded})} 
                                                onClick={() =>setExpanded(!expanded)}
                                /> 
                </h3>
                <Collapse in={expanded}>
                    <Paper elevation={4} className={classes.paper}>
                        {invitations.map((invitation, index) => {
                            return <Grid
                                        key={index}
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-start"
                                    >

                                        <h5>{invitation.user.nameInvocador}</h5>
                                        <ClearIcon className={classes.deleteIcon} />
                                    </Grid>
                        })}
                    </Paper>
                </Collapse>
            </Grid>
        </Grid>
    );

}