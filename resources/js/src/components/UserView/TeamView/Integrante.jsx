import React from 'react';
import { Grid, FormControl, Select, InputLabel, makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ModalAddIntegrante from './ModalAddIntegrante';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StarsIcon from '@material-ui/icons/Stars';
import swal from 'sweetalert';

const useStyles = makeStyles(() => ({
    integrante:{
        border: '1px solid #cb9738',
        padding: 10,
        marginTop:5,
        marginBottom:5,
    },
    formControl:{
        background: "#FFF"
    },
    addIcon: {
        fontSize:60,
        color:'#BE8222',
        transition:'1s',
        '&:hover': {
            transition:'1s',
            color:'#FFF',
            cursor:'pointer',
        }
    },
    btnDeleteInt:{
        color:'#921010',
        cursor:'pointer',
        transition: '0.5s',
        '&:hover':{
            transition: '0.5s',
            color:'#DE6B6B',
            fontSize: 35,
        }
    }
}));

export default function Integrante (props){
    const classes = useStyles();
    const [openModalAdd, setOpenModalAdd] = React.useState(0);


    const [state, setState] = React.useState({
        rol: 0,
        name: '',
        iconLane: '',
      });

    React.useEffect(() =>{
        
        if (props.integrante != null) {
            let valueRol = 0;
            props.integrante.rol != null ? valueRol = props.integrante.rol : null ;
            setState({
                ...state,
                rol: valueRol,
                name: props.integrante.user.nameInvocador,
                iconLane:setIcon(props.integrante.rol)
            })
        }
    },[])

    const setIcon = (value) =>{
        let icon = '...';
        if (value != null) {
            let urlImgPosition = '/images/logosPosition/Position_Challenger-'
            switch (parseInt(value)) {
                case 1:
                    urlImgPosition = urlImgPosition+"Top.png";
                    break;
                case 2:
                    urlImgPosition = urlImgPosition+"Mid.png";
                    icon = "mid";
                    break;
                case 3:
                    urlImgPosition = urlImgPosition+"Jungle.png";
                    icon = "jg";
                    break;
                case 4:
                    urlImgPosition = urlImgPosition+"Bot.png";
                    icon = "bot";
                    break;
                case 5:
                    urlImgPosition = urlImgPosition+"Support.png";
                    icon = "supp";
                    break;
            }
            return <img src={urlImgPosition} alt="Icon-Position" />;
        }
        return icon;
    }

    const handleChange = (event) => {
        const name = event.target.name;
        
        let icon = setIcon(event.target.value);
        setState({
          ...state,
          [name]: event.target.value,
          iconLane: icon,
        });
        
        fetch('/Integrante/editRol/'+props.integrante.user_id+'/'+event.target.value); //LO MANDO AL BACK PARA CARGAR EN BD
      };
    
    const renderSelect = () => {

        if ((props.liderView) || (props.integrante.user_id == userId)) {
            return(
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Rol</InputLabel>
                    <Select
                    native
                    value={state.rol}
                    onChange={handleChange}
                    inputProps={{
                        name: 'rol',
                        id: 'filled-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value="" />
                    <option value={1}>Top Lanner</option>
                    <option value={2}>Mid Lanner</option>
                    <option value={3}>Jungle</option>
                    <option value={4}>Bottom</option>
                    <option value={5}>Support</option>
                    </Select>
                </FormControl>
            );
        }
    }

    const render = () => {
        if (props.integrante != null) {
           return( 
            <Grid 
                container
                className={classes.integrante} 
            >
                <Grid item xs={4}>
                    <Grid container justify="flex-start">                        
                        <NameInvocador nameInvocador={state.name} integrante={props.integrante} isLider={props.liderView} />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify="center">
                        {state.iconLane}
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify="flex-end">
                        {renderSelect()}
                    </Grid>
                </Grid>       
            </Grid>
           );
        }
        else if(props.liderView){

            return (<Grid 
                        className={classes.integrante} 
                        container
                        justify="center"
                    >
                        <AddCircleOutlineIcon 
                            onClick={() => setOpenModalAdd(openModalAdd+1)}
                            className={classes.addIcon} 
                            />
                    </Grid>
                )
        }else{
            return(
                <Grid 
                        className={classes.integrante} 
                        container
                        justify="center"
                    >
                        <HourglassFullIcon 
                            className={classes.addIcon} 
                            />
                    </Grid>
            );
        }

    }

    return(
        
            <div>
                <ModalAddIntegrante open={openModalAdd} />

                {render()}
            </div>
);
}

function NameInvocador(props) {
    const classes = useStyles();
    const [isLider] = React.useState(props.isLider);

    const deleteInt = (id) => {
        const data = {
            'id': id,
        }
        fetch('/delete-integrante',{
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
                swal('Great', 'Integrante eliminado con exito', 'success');
                location.reload();
            }else{
                swal('Error', info.error, 'error');
            }
        })
    }

    const renderName = () =>{
        if (props.integrante.lider) {
            return(
                <Grid
                    container
                    justify="space-between"
                >
                    <p>{props.nameInvocador}</p>  
                    <StarsIcon />

                </Grid>
            );
        }
        return <p>{props.nameInvocador}</p>;
    }

    if (isLider && (props.integrante.user_id != userId)) {
        return(
            <Grid
                container
                justify="space-between"
                alignItems="center"
            >   
                <Grid item >
                    {renderName()}  
                </Grid>
                <Grid item >
                    <HighlightOffIcon className={classes.btnDeleteInt} onClick={() => deleteInt(props.integrante.user_id)} />
                </Grid>

            </Grid>
        );
    }
    return(
        <div>

        {renderName()}
        </div>
    );
}