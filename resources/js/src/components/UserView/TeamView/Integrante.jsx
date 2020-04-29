import React from 'react';
import { Grid, FormControl, Select, InputLabel, makeStyles } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ModalAddIntegrante from './ModalAddIntegrante';

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
}))
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
      };

    const render = () => {
        if (props.integrante != null) {
           return( 
            <Grid 
                className={classes.integrante} 
                container
                justify="space-between"
            >
                <p>{state.name}</p>
                <Grid item >{state.iconLane}</Grid>

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
            </Grid>
           );
        }
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
    }

    return(
        
            <div>
                <ModalAddIntegrante open={openModalAdd} />

                {render()}
            </div>
);
}