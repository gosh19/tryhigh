import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ModalInscripcion from './ModalInscripcion';


import './UserView.css';
import { CircularProgress } from '@material-ui/core';

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
  },
  img:{
    width: 100,
    display: 'block',
    margin: 'auto',
    border: '2px solid #DBA901',
    marginBottom: 15,
  },
  imgRank:{
    width: 200,
    display: 'block',
    margin: 'auto',
    marginBottom: 15,
  }
});

const setRank = (value) => {

  let url = '/images/logoRank/Emblem_';
  switch (value) {
    case 'IRON':
      url = url+'Iron.png'
      break;
    case 'SILVER':
      url = url+'Silver.png'
      break;
    case 'GOLD':
      url = url+'Gold.png'
      break;
    case 'PLATINUM':
      url = url+'Platinum.png'
      break;
    case 'DIAMOND':
      url = url+'Diamond.png'
      break;
    case 'MASTER':
      url = url+'Master.png'
      break;
    default:
      break;
  }
  return url;
}


export default function CajaUser(props) {
  const classes = useStyles(); 
  const [imgRank, setImgRank] = React.useState(<CircularProgress />); 

  const registrado = props.estadoRegistro;
  let buttonValue = false;
  
  React.useEffect(() => {
    let img = null;
    if ((props.datosInvocador != null) &&(props.datosInvocador.rankInfo != null)) { 
      if (props.datosInvocador.rankInfo.length != 0) {
        
        const rank = props.datosInvocador.rankInfo.find(rank => rank.queueType = "RANKED_SOLO_5X5");
        
         img = rank!=null? setRank(rank.tier): setRank(props.datosInvocador.rankInfo[0].tier) ;
      }else{
         img = setRank('IRON');
      }
      const RImg = <img src={img} className={classes.imgRank}/>
      setImgRank(RImg);
    }
  }, [props.datosInvocador.rankInfo]);
  if(registrado == 1){
    buttonValue = true;
  }

  return (
    <Card className={classes.card}>

        <CardContent>
          <img src={'http://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/'+props.datosInvocador.profileIconId+'.png'} className={classes.img}/>
          <Typography gutterBottom variant="h5" component="h2" >
            {props.nombreInvocador}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" >
            <strong>Nivel:</strong> {props.datosInvocador.summonerLevel}
          </Typography>
          {imgRank}

        </CardContent>
        <ModalInscripcion 
          buttonValue={buttonValue}
          userId={props.userId}
        />
    </Card>
  );
}