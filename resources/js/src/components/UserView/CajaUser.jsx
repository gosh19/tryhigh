import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ModalInscripcion from './ModalInscripcion';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';

import './UserView.css';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import swal from 'sweetalert';

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
  },
  editIcon:{
    fontSize:15,
    cursor:'pointer',
    transition: '0.5s',
    '&:hover':{
                fontSize:25,
              }
  },
  loadIcon:{
    fontSize:30,
    color: '#DBA901',
    cursor:'pointer',
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
  const [iconId , setIconId] = React.useState(1); 
  const [lvl, setLvl] = React.useState(0); 

  const registrado = props.estadoRegistro;
  let buttonValue = false;
  
  React.useEffect(() => {
    let img = null;    
    if (props.datosInvocador.length != 0) { 
      if (props.datosInvocador.tier_league != null ) {
                
         img = setRank(props.datosInvocador.tier_league);
         setIconId(props.datosInvocador.icon);
         setLvl(props.datosInvocador.lvl);
      }else{
         img = setRank('IRON');
         setLvl('Invocador no encontrado');
      }
      const RImg = <img src={img} className={classes.imgRank}/>
      setImgRank(RImg);
    }
  }, [props.datosInvocador]);

  if(registrado == 1){
    buttonValue = true;
  }

  return (
    <Card className={classes.card}>

        <CardContent>
          <img src={'http://ddragon.leagueoflegends.com/cdn/10.8.1/img/profileicon/'+iconId+'.png'} className={classes.img}/>
          <Typography gutterBottom variant="h5" component="h2" >

            <NombreInvocador nombreInvocador={props.nombreInvocador} />
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" >
            <strong>Nivel:</strong> {lvl}
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

function NombreInvocador(props) {
  const classes = useStyles();
  const [edit , setEdit] =React.useState(false);
  const [nameInvocador, setNameInvocador] = React.useState(props.nombreInvocador);
  const [newName, setNewName] = React.useState();
  const [loadIcon, setLoadIcon] = React.useState(false);


  React.useEffect(() =>{
    if (newName != props.nombreInvocador) {
      
      setNameInvocador(props.nombreInvocador);
    }
  },[props.nombreInvocador])
  const handleNameChange = () =>{
    setEdit(!edit);
  }

  const renderLoadIcon = () =>{
    if (loadIcon) {
      return <CircularProgress />;
    }
    return <PublishIcon className={classes.loadIcon} onClick={() => loadData(newName)} />
  }

  const HandleInputChange = (e) =>{
    const value = e.target.value;
    setNewName(value);
  }

  const loadData = (value) =>{
    setLoadIcon(true);
    
    const data = {
            'id': 1,
            'name': newName,
    }
    fetch('/change-nameInv',{
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
      console.log(info);
      
      if(!info.estado){
        swal('Error', info.error, 'error');
      }
      
      setEdit(false);


    })
    setNameInvocador(value);
    setLoadIcon(false);
  }

  if (edit) {
    return(

    
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
      <Grid item >

        <TextField variant="outlined" style={{background:'#c7c7c7',borderRadius:5,}} value={newName} onChange={HandleInputChange} />
      </Grid>
      <Grid item >
        {renderLoadIcon()}
      </Grid>
      <Grid item >
        <CloseIcon className={classes.editIcon} onClick={() => handleNameChange()} />
      </Grid>
    </Grid>
    );
  }else{

    return (
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
              <Grid item >

                <h5>{nameInvocador}</h5>
              </Grid>
              <Grid item >
                <EditIcon className={classes.editIcon} onClick={() => handleNameChange()} />
              </Grid>
            </Grid>
      )
    }

}