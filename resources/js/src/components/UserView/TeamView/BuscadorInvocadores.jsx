import React from 'react';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import swal from 'sweetalert';

const useStyles = makeStyles(() => ({
    rowInv:{
        marginTop:10,
    }
}))
export default function BuscadorInvocadores(){
    const classes = useStyles();
    const [invocadores, setInvocadores] = React.useState([]);
    const [data, setData] = React.useState();


    const handleInputChange = (event) => {
        setData(event.target.value);
    }

    const serchInvocadores = (s) => {
        fetch('/serch-invocadores/'+s)
        .then(response => response.json())
        .then(info => {
            setInvocadores(info);
        })
    }

    React.useEffect(() => {
        serchInvocadores(data);
    },[data]);

    const sendInvitation = (id) => {
        const data = {
            user_id: id,
        }
        fetch('/Invitation',{
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
            if (info.estado) {
                swal('Great', 'Invitacion enviada con exito', 'success');
            }else{
                swal('Error', 'Error al enviar invitacion: '+info.error, 'error');
            }
        })
    }

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            overflow="visible"
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <TextField value={data} onChange={handleInputChange} id="standard-basic" label="Standard" />
            </Grid>
                {invocadores.map((inv, index)=>{
                    return(
                        <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.rowInv}
                        >

                        <Grid item>
                            {inv.nameInvocador}        
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => sendInvitation(inv.id)}
                                >
                                Invitar
                            </Button>
                        </Grid>
                    </Grid> 
                    );
                })}               
        </Grid>
    );

}