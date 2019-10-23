import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
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
    .then(info => console.log(info));  
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

    return (
    <div>
      <Button
            className={classes.button}
            color="primary"
            variant="contained"
            disabled={props.buttonValue}
            onClick={handleOpen}
      >
        Registrarme
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Selecciona el torneo al que quieres inscribirte</h2>
            {torneos.map(torneo =>{
                return(
                    <ul key={torneo.id}>
                        <li>{torneo.id}</li>
                        <li>{torneo.nombre}</li>
                        <li>{torneo.fecha_inicio}</li>
                        <Button 
                            type="button"
                            color="primary"
                            variant="contained"
                            onClick ={() => inscribirme(props.userId, torneo.id)}
                        >
                            Inscribirme
                        </Button>
                    </ul>
                )
            })}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}