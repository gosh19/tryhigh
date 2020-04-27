import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';

import './TeamView.css';
import PanelIntegrantes from './PanelIntegrantes';
import Invitaciones from './Invitaciones';
import swal from 'sweetalert';

const useStyles = makeStyles(() => ({
    root:{
        padding:25,
    },
    nombreTeam:{
        border: '2px solid #c39031',
        padding: 15,
        color: '#cb9738',
        fontFamily: 'nasalization',
        background: 'rgba(0,0,0,0.7)'
    },
    avatar:{
        width: '60%',
        borderRadius: '50%'
    }
}))

const deleteTeam = (id) => {
    fetch('/TeamLol/'+id,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        credentials: 'same-origin',
        //body: JSON.stringify(data[0])

    })
    .then(response => response.json())
    .then(info => {
        if (info.estado) {
            location.reload();
        }else{
            swal('Error', info.error, 'error');
        }
        
    })
}

export default function PanelTeam(props){
    const classes = useStyles();

    const [team, SetTeam] = React.useState(props.team);


    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
            className={classes.root}
        >
            <Grid  item sm={4}>

              <h3 className={classes.nombreTeam}> {team.nombre}</h3>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}
                className={classes.root}
                >
                    <img className={classes.avatar} src="/images/thlogo.png" alt="Avatar"/>
                </Grid>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                >
                    <Invitaciones />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteTeam(team.id)}
                    >
                        Eliminar Equipo
                    </Button>
                </Grid>

            </Grid>
            <Grid item sm={8}>
                <PanelIntegrantes team={team} />
            </Grid>
        </Grid>
    );
}