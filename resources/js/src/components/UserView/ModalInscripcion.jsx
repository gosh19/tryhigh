import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

import swal from '@sweetalert/with-react';


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

var torneos = [];   //ARRAY CON LOS TORNEOS DISPONIBLES

function inscribirme(userId, torneoId) {    
    const data ={
        'user_id': userId,
        'torneo_id': torneoId,
    }
    
    fetch('inscriptos',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(info => {
      console.log(info);
      
        if(info.estado === 1){
          swal(
              <div>
                <h1>Registrado con exito</h1>
              </div>
            ,{
              icon: "success",
              button: {
                  text: "Ok",                       
              }
            });
            location.reload();
      }
      else{
          swal(
              <div>
                <h2>Error al registrarse</h2>
          <h1>{info.mensaje}</h1>
              </div>
            ,{
              icon: "error",
              button: {
                  text: "Salir",               
              }
            });
      }
    });  
}

export default function ModalInscripcion(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


   fetch('torneo_tfts')
    .then(response => response.json())
    .then(info => torneos = info
    );

    function renderTorneos() {
      
      if (torneos.length != 0) {
        return  torneos.map(torneo =>{
              
          return(
              <div key={torneo.id} className="torneo">
                  <h3>{torneo.nombre}</h3>
                  <h5>Fecha de inicio: {torneo.fecha_inicio}</h5>
                  <Button 
                      type="button"
                      color="secondary"
                      variant="contained"
                      onClick ={() => inscribirme(props.userId, torneo.id)}
                  >
                      Inscribirme
                  </Button>
              </div>
          )
      });
      }
      else{
        return <div
                className="alert-warning font-weight-bold m-3 p-3 d-flex justify-content-center rounded border border-warning"
                >
                  Inscripciones abiertas proximamente para el torneo 1v1</div>
      }
      
    }
    

    return (
    <div>
      <Button
            className="m-3"
            color="primary"
            variant="contained"
            disabled={props.buttonValue}
            onClick={handleOpen}
      >
        Inscribirme a un torneo
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-inscripcion">
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Selecciona el torneo al que quieres inscribirte</h2>
            <hr />
            {renderTorneos()}
          </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}