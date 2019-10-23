import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Grid, Button } from '@material-ui/core';
import CajaUser from './CajaUser';
import CajaNoticias from './CajaNoticias';
import CajaEstado from './CajaEstado';
import CajaLlave from './CajaLlave';
import Puntos from './Puntos';
import Footer from '../Footer';

class UserView extends Component {
    constructor(){
        super();
        this.state = {
            nombreInvocador: '',
            estadoRegistro: '',
            userId: '',
            partidasTerminadas: [],
            partidasNoTerminadas: [],
            CajaLlave: null,
        };
        this.mostrarCajaLlave = this.mostrarCajaLlave.bind(this);
        this.mostrarCajaEstado = this.mostrarCajaEstado.bind(this);
        this.verificarRegistro = this.verificarRegistro.bind(this);
        this.volver = this.volver.bind(this);
    }

    componentDidMount(){
        this.setState({
            nombreInvocador: nombreInvocador,
            userId: userId,
        });
        this.verificarRegistro(userId);
    }

    verificarRegistro(id){
        fetch('inscriptos/'+id)
        .then(response => response.json())
        .then(inscriptos => {
                fetch('partidas/'+this.state.userId)
                .then(response => response.json())
                .then(info => this.setState((state, props) =>{ 
                    if (info.noTerminadas == null) {
                        info.noTerminadas = [];
                    }    
                    if (info.Terminadas == null) {
                        info.Terminadas = [];
                    }                                  
                        return{
                                partidasTerminadas: info.Terminadas,
                                partidasNoTerminadas: info.noTerminadas
                            }
                    })
                );   
            this.setState({estadoRegistro: inscriptos.estado})
        });     
    }
/**
 * si esta registrado muestra la caja llave
 * obvio pero capaz mañana no tantoi, un saludo master
 */
    mostrarCajaLlave(){
        if(this.state.estadoRegistro ==1){             
            return (<CajaLlave 
                        nombreInvocador= {this.state.nombreInvocador}
                    />)
        }else{
            return null;
        }
    }

    mostrarCajaEstado(){
        
        if((this.state.estadoRegistro ==1) &&((this.state.partidasTerminadas.length != 0) || (this.state.partidasNoTerminadas.length != 0))){ 

            return (<CajaEstado 
                        partidasTerminadas={this.state.partidasTerminadas} 
                        partidasNoTerminadas={this.state.partidasNoTerminadas}
                    />)
        }else{
            return null;
        }
    }

    volver(){
        window.location.href = "/"
    }

    render() {
        return (
            <div>


            <div className="fondo-perfil p-5">  
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    sm={12}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                        md={4}
                        sm={12}
                    >
                        <CajaUser 
                            nombreInvocador={this.state.nombreInvocador}
                            estadoRegistro = {this.state.estadoRegistro}
                            userId={this.state.userId}
                        />
                        <Puntos />
                        {this.mostrarCajaEstado()}
                        <Button
                            className="mt-4 text-white"
                            variant="contained"
                            color="primary"
                            onClick={this.volver}
                        >Volver al inicio</Button>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        md={8}
                        sm={12}
                    >
                        {this.mostrarCajaLlave()}
                        <CajaNoticias />
                    </Grid>
                </Grid>
            </div>
                <Footer />
            </div>
        );
    }
}

export default UserView;

if(document.getElementById('UserView')){
    ReactDOM.render(
        <UserView />, 
        document.getElementById('UserView')
    );
}