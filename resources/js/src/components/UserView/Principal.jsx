import React, { Component } from 'react';

import { Grid, Button } from '@material-ui/core';
import CajaUser from './CajaUser';
import CajaNoticias from './CajaNoticias';
import CajaEstado from './CajaEstado';
import CajaLlave from './CajaLlave';
import CajaAnuncios from './CajaAnuncios';
import Puntos from './Puntos';

class Principal extends Component {
    constructor(){
        super();
        this.state = {
            nombreInvocador: '',
            estadoRegistro: '',
            estadoConfirmacion: true,
            userId: '',
            llaveId: '',
            partidasTerminadas: [],
            partidasNoTerminadas: [],
            CajaLlave: null,
            datosInvocador: [],
        };

        this.mostrarCajaEstado = this.mostrarCajaEstado.bind(this);
        this.verificarRegistro = this.verificarRegistro.bind(this);
        this.volver = this.volver.bind(this);
        this.cargarSummoner = this.cargarSummoner.bind(this);
        this.verificarConfirmacion = this.verificarConfirmacion.bind(this);


    }

    componentDidMount(){
        this.setState({
            nombreInvocador: nombreInvocador, //ESTE DATO Y USERID LOS TRAIGO DE LA VISTA DE PHP
            userId: userId,                   //EN FORMA DE SCRIPT Y VARIABLE GLOBAL. VER LA VISTA DONDE RENDERIZO ESTO PARA MAS INFO
        });
        this.verificarRegistro(userId);
        this.cargarSummoner(nombreInvocador);
        this.verificarConfirmacion();
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
            this.setState({
                estadoRegistro: inscriptos.estado,
                llaveId: inscriptos.datos.llave_id,
            })
        });     
    }

    verificarConfirmacion(){
        fetch('infoConfirmacion/'+userId)
        .then(resposne => resposne.json())
        .then(info => {
            this.setState((state, props) =>{
                
                return{
                    estadoConfirmacion: info.estado,
                }
            } )
        })
    }
    cargarSummoner(){
        try {
            fetch('https://cors-anywhere.herokuapp.com/https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+nombreInvocador+'?api_key=RGAPI-153095d5-18cd-407b-a4ac-5671893d7d70')
            .then(response => response.json())
            .then(info => {
                this.setState((state, props) =>{                    
                    return{
                        datosInvocador: info,
                    }
                });
                fetch('https://cors-anywhere.herokuapp.com/https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/'+info.id+'?api_key=RGAPI-153095d5-18cd-407b-a4ac-5671893d7d70')
                .then(response => response.json())
                .then(rankInfo => {
                    this.setState((prevState, props) =>{ 
                        let data = prevState.datosInvocador;
                        data.rankInfo = rankInfo;
                        return{
                            datosInvocador: data,
                        }
                    });
                })
            })
        } catch (error) {
            console.log(error);
            
        }
    }
/**
 * si esta registrado muestra la caja llave
 * obvio pero capaz mañana no tantoi, un saludo master
 */
    mostrarCajaLlave(){
        if(this.state.estadoRegistro ==1){             
            return (<CajaLlave 
                        userId={this.state.userId}
                        nombreInvocador= {this.state.nombreInvocador}
                        llaveId={this.state.llaveId}
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
            <div className="fondo-negro">


            <div className="fondo-perfil p-5">  
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item md={4}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <CajaUser 
                                nombreInvocador={this.state.nombreInvocador}
                                estadoRegistro = {this.state.estadoRegistro}
                                userId={this.state.userId}
                                datosInvocador={this.state.datosInvocador}
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
                    </Grid>
                    <Grid item md={8}>

                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            >
                            <CajaNoticias />
                            <CajaAnuncios />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
                
            </div>
        );
    }
}

export default Principal;

