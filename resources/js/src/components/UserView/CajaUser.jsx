import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Modal } from '@material-ui/core';
import ModalInscripcion from './ModalInscripcion';


import './UserView.css';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    background: 'linear-gradient(0deg, #0A0A2A 30%, #010445 90%)',
    '& h2':{
        fontFamily: 'nasalization',
        color: '#848485'
    }
  },
  avatar: {
      margin: 20,
  },
  button: {
    marginTop: 20,
  }
});


export default function CajaUser(props) {
  const classes = useStyles();

  const registrado = props.estadoRegistro;
  let buttonValue = false;
  let openModal = false;

  if(registrado == 1){
    buttonValue = true;
  }

  return (
    <Card className={classes.card}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" >
            {props.nombreInvocador}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" >
            {/*<strong>Nivel:</strong> {props.datosInvocador.summonerLevel} ESTA WEA ES PARA CUANDO RESUELVA LA API DEL LOL*/}
          </Typography>
          <img src="/images/escudo.png" width="50%" />
        </CardContent>
        <ModalInscripcion 
          buttonValue={buttonValue}
          userId={props.userId}
        />
    </Card>
  );
}