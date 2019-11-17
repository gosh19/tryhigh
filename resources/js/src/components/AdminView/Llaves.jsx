import React, { Component } from 'react';

import { Button } from '@material-ui/core';


class Llaves extends Component {
    constructor(props){
        super(props);
        this.state= {
            torneoId: this.props.torneoId,
            inscriptos: [],
            llave_id: [],
            llaves: [],

        }        
        this.setInscriptos = this.setInscriptos.bind(this);
        this.setLlaves = this.setLlaves.bind(this);
        this.pasaRonda = this.pasaRonda.bind(this);
        this.finalizarLlave = this.finalizarLlave.bind(this);
    }

    componentDidMount(){
        this.setInscriptos();
    }
    setInscriptos(){
        try {
            fetch('llaves/'+this.props.torneoId)
            .then(response => response.json())
            .then(info => {                
                if (info.estado == 1) {
                    this.setState((state, props) => {
                       
                        return{
                            inscriptos: info.datos, 
                            llaves: info.llaves,
                        }
                    });
                }
            })
        } catch (error) {
            
        }
    }
    /**
     * RECIBE EL ID DE PARTIDA PARA CAMBIAR EL ESTADO A PASO
     * @param {*} partida_id 
     */
    pasaRonda(partida_id){
        fetch('partidas/pasa/'+partida_id)
        .then(response => response.json())
        .then(info => console.log(info));

        
    }

    setLlaves(){
        var i = -1;
        var llaves = [];
        var llavesaux = [];

        //SI HAY INSCRIPTOS MAPEO LLAVE POR LLAVE
        if (this.state.inscriptos.length != 0) {            
            llaves = this.state.inscriptos.map((insLlave) =>{     
                i++;
                if (insLlave.length != 0) {
                               
                llavesaux = insLlave.map((inscripto) => {
                    
                    var colorBoton = "primary";
                    var estadoBoton = false;    //FALSE PARA EL DISABLE= FALSE

                    if (inscripto.partidas[inscripto.partidas.length -1 ].estado != "pendiente") {
                        estadoBoton = true;
                    }
                                return  <div key={inscripto.user_id}>
                                            <h4>{inscripto.user.nameInvocador}</h4>
                                            <Button
                                                color={colorBoton}
                                                variant="contained"
                                                disabled={estadoBoton}
                                                onClick={() => this.pasaRonda(inscripto.partidas[inscripto.partidas.length -1 ].id)}
                                            >
                                                Pasa de Ronda
                                            </Button>
                                        </div>
                            }); 
                
                return  <div  key={insLlave[0].llave_id} >
                            <h1>Llave {insLlave[0].llave_id} - Ronda {this.state.llaves[i].ronda} </h1>
                            <Button
                                color="secondary"
                                variant="contained"
                                disabled={true}
                                onClick={() => this.finalizarLlave(insLlave[0].llave_id)}
                            >
                                Finalizar Llave
                            </Button>
                            <hr />
                            {llavesaux}
                            <hr />
                        </div>;
            }
            })
        }
        
        return llaves;

    }


    finalizarLlave(llave_id){
        try {
            fetch('finalizarLlave/'+llave_id)
            .then(response => response.json())
            .then(info => console.log(info));
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    render() {
        
 
        return (
            <div>
                <h1>Selecciona los ganadores del torneo: {this.state.torneoId}</h1>
                
                {this.setLlaves()}
            </div>
        );
    }
}

export default Llaves;