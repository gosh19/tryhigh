import React from 'react';
import { makeStyles } from '@material-ui/core';
import './TeamView.css';

const useStyles = makeStyles(() => ({
    root:{
        border: '2px solid #c39031',
        padding: 15,
        color: '#cb9738',
        fontFamily: 'nasalization',
        background: 'rgba(0,0,0,0.7)'
    }
}))
export default function PanelIntegrantes(props){
    const classes = useStyles();
    const [integrantes , setIntegrantes] = React.useState([]);


    React.useEffect(() => {
        getIntegrantes();
    }, [])

    const getIntegrantes = () => {
        console.log(35);
        
        fetch('/get-Integrantes/'+props.team.id)
        .then(response => response.json())
        .then(info => {            
            setIntegrantes(info);
        })
    }

    const renderIntegrantes = () => {
        const render = integrantes.map((integrante, index) => {
            console.log(integrante);
            
            return <h1>{integrante.user.name}</h1>
        })
        return <h1>{render} </h1>;
    }

    return(
        <div className={classes.root} >{renderIntegrantes()}</div>
    );
}