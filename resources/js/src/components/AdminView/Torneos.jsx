import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import Llaves from './Llaves';
import { isThisQuarter } from 'date-fns';

class Torneos extends Component {
    constructor(){
        super();
        this.state = {
            torneos: [],
            torneoId: null,
        }
        this.mostrarTorneos = this.mostrarTorneos.bind(this);
        this.cargarTorneos = this.cargarTorneos.bind(this);
        this.verLlaveTorneo = this.verLlaveTorneo.bind(this);
        this.renderLlave = this.renderLlave.bind(this);
        this.iniciarTorneo = this.iniciarTorneo.bind(this);
    }

    componentDidMount(){
        this.cargarTorneos();
    }
    /**
     * CARGA LOS TORNEO Q ESTEN ABIERTOS
     */
    cargarTorneos(){
        try {
            fetch('torneo_tfts')
            .then(response => response.json())
            .then(info => {
                this.setState((state, props) =>{                    
                    return {
                        torneos: info,
                    }
                }
                )
            })
        } catch (error) {
            
        }
    }
    /**
     * LISTA LOS TORNEOS EN EL DOM
     */
    mostrarTorneos(){        
        if (this.state.torneos.length != 0) {
           
           const listTorneos =     this.state.torneos.map((torneo) =>
                    <div key={torneo.id}>
                    <li >{torneo.nombre}</li>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => this.verLlaveTorneo(torneo.id)}
                    >Seleccionar</Button>

                    </div>
                );
         return listTorneos;       

        }
    }
    /**
     * MUESTRA EL TORNEO SELECCIONADO
     */
    verLlaveTorneo(torneoId){
        this.setState((state, props) =>{
            
            return{
                torneoId: torneoId,
            }
        });
    }

    renderLlave(id){
        
        if (this.state.torneoId != null) {
            return <div>
                     <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.iniciarTorneo(this.state.torneoId)}
                     >
                         Iniciar
                     </Button>
                     <Llaves key={id} torneoId={id} />
                    </div>
        }else{
            return null;
        }
    }

    /**
     *  PONE EL TORNEO EN JUEGO APRA Q APAREZCAN LOS CONTRINCANTES EN LA TABLA DE LOS USER
     * @param {id del torneo} id 
     */
    iniciarTorneo(id){
        fetch('torneo_tfts/iniciar/'+id)
        .then(response => response.json())
        .then(info => console.log(info));
    }

    render() {
        return (
            <div>
                <h2>Seleccione el torneo para ver</h2>
                {this.mostrarTorneos()}
                {this.renderLlave(this.state.torneoId)}
            </div>
        );
    }
}

export default Torneos;