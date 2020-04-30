import React from 'react';
import { makeStyles,  CircularProgress } from '@material-ui/core';
import './TeamView.css';
import Integrante from './Integrante';

const useStyles = makeStyles(() => ({
    root:{
        border: '2px solid #c39031',
        padding: 15,
        color: '#cb9738',
        fontFamily: 'nasalization',
        background: 'rgba(0,0,0,0.7)'
    }
}));

export default function PanelIntegrantes(props){
    const classes = useStyles();
    const [integrantes , setIntegrantes] = React.useState([]);
    

    React.useEffect(() => {
        getIntegrantes();
    }, [])

    const getIntegrantes = () => {
        
        fetch('/get-Integrantes/'+props.team.id)
        .then(response => response.json())
        .then(info => {            
            setIntegrantes(info);
        });

    }


    const renderIntegrantes = () => {
 
        if (integrantes.length != 0) {
            let render = new Array();
            for (let index = 0; index < 5; index++) {
                if (integrantes[index] != null) {
                    
                    render.push(<Integrante key={index} liderView={props.isLider} integrante={integrantes[index]}/>);
                }else{

                    render.push(<Integrante key={index} liderView={props.isLider} integrante={null}/>);
                }
            }
            return <h1>{render} </h1>;
        }
        return <CircularProgress />
    }

    return(
        <div className={classes.root} >
            {renderIntegrantes()}
        </div>
    );
}