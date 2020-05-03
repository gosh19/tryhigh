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
        '&:hover':{
  
            cursor:'pointer',
        }
      },
    expandOpen: {
        transform: 'rotate(180deg)',
        fontSize: 50,
        color: '#FFF',
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
    const [number, setNumber] = React.useState(0);

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

    const deleteInvitation = (index) => {
        let invs = invitations;
        const data = invs.splice(index,1);           
        fetch('/Invitation/'+data[0].user_id,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'same-origin',
            body: JSON.stringify(data[0])

        })
        .then(response => response.json())
        .then(info => {     
                  
            if (info.estado) {
                setInvitations(invs);
                setNumber(number+1); //CON ESTO ME HACE EL RENDERIZADO DE NUEVO, SINO NO
            }else{
                //swal('Error', info.error, 'error');
            }
        })   
    }

    const renderInvitaciones = () => {
        if (invitations.length == 0) {
            return <p>No hay invitaciones pendeintes</p>
        }
        invitations.map((invitation, index) => {
            return <Grid
                        key={index}
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >

                        <h5>{invitation.user.nameInvocador}</h5>
                        <ClearIcon className={classes.deleteIcon} onClick={() => deleteInvitation(index)} />
                    </Grid>
        })
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
                <h3>Invitaciones pendientes<ExpandMoreIcon 
                                                className={clsx(classes.expand, {[classes.expandOpen]: expanded})} 
                                                onClick={() =>setExpanded(!expanded)}
                                /> 
                </h3>
                <Collapse in={expanded}>
                    <Paper elevation={4} className={classes.paper}>
                        {renderInvitaciones()}
                    </Paper>
                </Collapse>
            </Grid>
        </Grid>
    );

}