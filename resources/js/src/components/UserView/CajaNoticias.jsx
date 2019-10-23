import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Noticias from './Noticias';

import './UserView.css';

class CajaNoticias extends Component {
    constructor(props){
        super(props);
        this.state = {
            noticias: [],
        }
        this.setNoticias = this.setNoticias.bind(this);
        this.mostrarNoticias = this.mostrarNoticias.bind(this);
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
            console.log('nosepudoxd');
            
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
                        md={6}
                    >
                        <h1>Novedades</h1>
                    </Grid>
                </Grid>
                <Grid   //ROW DE CONTENIDO
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    {this.mostrarNoticias()}
                </Grid>
            </div>
        );
    }
}

export default CajaNoticias;