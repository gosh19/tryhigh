import React, { Component } from 'react';

import './UserView.css';

class CajaEstado extends Component {
    constructor(props){
        super(props);
        this.state = {
            //sigPartida: [],
            fechaSigPartida: 'Sin Fecha Disponible',
            sigPartida: [],
            partidasNoTerminadas: [],
            partidasTerminadas: [],
        };
        
        this.siguientePartida = this.siguientePartida.bind(this);
    }
    siguientePartida(){
        if(this.props.partidasNoTerminadas.length !== 0){       
            this.setState((state,props) =>{            
                return{
                    sigPartida: this.props.partidasNoTerminadas[this.props.partidasNoTerminadas.length-1],
                    fechaSigPartida: this.props.partidasNoTerminadas[this.props.partidasNoTerminadas.length-1].fecha,
                }
            });
        }  
    }

    setHistorial(){
        if(this.props.partidasTerminadas.length !== 0){       
            this.setState((state,props) =>{
                return{
                    partidasTerminadas: this.props.partidasTerminadas,
                }
            });
        }
    }
    
    componentDidMount(){
        this.siguientePartida();
        this.setHistorial();
    }
    render() {        
        return (
            <div className="CajaEstado">
                <ul>
                    <li>Partidas Jugadas: {this.state.partidasTerminadas.length}</li>
                    <li>Siguiente Partida: {this.state.fechaSigPartida}</li>
                </ul>
            </div>
        );
    }
}

export default CajaEstado;