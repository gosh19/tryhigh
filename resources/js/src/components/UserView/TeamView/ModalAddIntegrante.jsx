import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import BuscadorInvocadores from './BuscadorInvocadores';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'block',
    margin: 'auto',
    marginTop:25,
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalAddIntegrante(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  React,useEffect(() => {
    
    if (open != props.open) {
      setOpen(true);
      
    }
  },[props.open])

  const body = (
    <div className={classes.paper}>
      <BuscadorInvocadores />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
