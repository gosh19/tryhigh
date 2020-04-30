import React from 'react';
import { Grid, makeStyles, Button, TextField, CircularProgress } from '@material-ui/core';

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
    },
    btnEdit:{
        background: '#6F421E',
        transition: '0.5s',
        '&:hover':{
            background: '#E8A068',
            transition: '0.5s', 
        }
    },
    inputEdit:{
        background:'#C7C7C7',
        borderRadius: 5,
    },
    btnDelete:{
        background: '#5E3D15',
        color: '#FFF',
        marginTop: 15,
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

const quitTeam = () => {
    fetch('/deleteInvitation')
    .then(response => response.json())
    .then(info => {
        console.log(info);
        
        if (info.estado) {
            location.reload();
        }
    })
}

export default function PanelTeam(props){
    const classes = useStyles();

    const [team, SetTeam] = React.useState(props.team);

    const renderButtonAndInvitations = (value) =>{
        if (value) {
          return  (
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            >
                <Invitaciones />
                <Button
                    variant="contained"
                    onClick={() => deleteTeam(team.id)}
                    className={classes.btnDelete}
                >
                    Eliminar Equipo
                </Button>
            </Grid>
          
          );
        }
        return(
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            >
                <Button
                    variant="contained"
                    onClick={() => quitTeam()}
                    className={classes.btnDelete}
                >
                    Salir
                </Button>
            </Grid>
        );
    }

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

              <NombreTeam isLider={props.isLider} team={team} />
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
                {renderButtonAndInvitations(props.isLider)}

            </Grid>
            <Grid item sm={8}>
                <PanelIntegrantes isLider={props.isLider} team={team} />
            </Grid>
        </Grid>
    );
}

function NombreTeam(props){
    const classes = useStyles();
    const [team , setTeam] = React.useState(props.team);
    const [change, setChange] = React.useState(false);
    const [newName, setNewName] = React.useState(props.team.nombre);
    const [loading, setLoad] = React.useState(false);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewName(value);
    }

    const loadNewName = () => {
        setChange(false);
        setLoad(true);
        const data = {
            'id': team.id,
            'name': newName,
        }
        fetch('/changeTeamName',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(info => {
            if(info.estado){
                let newTeamValue = team;
                newTeamValue.nombre = newName;
                setTeam(newTeamValue);
            }else{
                swal('Error', info.error, 'error');
            }
            setLoad(false);
        })
    }

    if(!props.isLider){
        return(
            <Grid
                container
                justify='space-between'
                className={classes.nombreTeam}
            >
                <h3 > {team.nombre}  </h3>
            </Grid>
        );
    }

    
    if (change) {
        return (
                <Grid
                    container
                    justify='space-between'
                    className={classes.nombreTeam}
                >

                    <TextField 
                        variant="outlined"  
                        value={newName} 
                        onChange={handleInputChange} 
                        className={classes.inputEdit}
                        />
                    <Button 
                        onClick={loadNewName}
                        className={classes.btnEdit}
                        variant="contained"
                    >Cargar</Button>
                </Grid>);

    }else if(loading){
        return <CircularProgress />
    }
    return (
            <Grid
                container
                justify='space-between'
                className={classes.nombreTeam}
            >
                <h3 > {team.nombre}  </h3>
                <Button 
                    onClick={() => setChange(true)}
                    variant="contained"
                    className={classes.btnEdit}
                >Editar</Button>
            </Grid>
            );

}