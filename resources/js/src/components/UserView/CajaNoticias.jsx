import React, { Component } from 'react';
import { Grid, Collapse, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Noticias from './Noticias';

import './UserView.css';

class CajaNoticias extends Component {
    constructor(props){
        super(props);
        this.state = {
            noticias: [],
            estadoNovedades: false,
        }
        this.setNoticias = this.setNoticias.bind(this);
        this.mostrarNoticias = this.mostrarNoticias.bind(this);
        this.openNoticias = this.openNoticias.bind(this);
    }

    setNoticias(){
        try {
            fetch('novedads')
            .then(response => response.json())
            .then(info => {
                this.setState((state,props) =>{                    
                    return{
                        noticias: info,
                    }
                })
            })
        } catch (error) {
            console.log('Error al cargar noticias'); 
        }
    }

    componentDidMount(){
        this.setNoticias();
    }

    mostrarNoticias(){        
        if (this.state.noticias.length != 0) {
            return (<Noticias noticias={this.state.noticias} />)
        }
    }

    openNoticias(){
        console.log('xd');
        
        this.setState((state, props) =>{
            return{
                estadoNovedades: !this.state.estadoNovedades,
            }
        })
    }

    render() {
        return (
            <div
                className="CajaNoticias"
            >
                <Grid   //ROW DEL TITULO
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    <Grid
                        container
                        direction= "column"
                        alligncontent="start"
                        justify="flex-start"
                    >
                        <h1>Novedades<ExpandMoreIcon className="ml-2 text-white" fontSize='large' onClick={() => this.openNoticias()} /></h1>
                    </Grid>
                </Grid>
                <Grid   //ROW DE CONTENIDO
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    <Collapse
                        in={this.state.estadoNovedades}
                        className="w-100 pr-2"
                        >
                        {this.mostrarNoticias()}
                    </Collapse>
                </Grid>
            </div>
        );
    }
}

export default CajaNoticias;