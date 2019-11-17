import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

import Fecha from './Fecha';

import swal from '@sweetalert/with-react';

class FormCrearTorneoTft extends Component {
    constructor(){
        super();
        this.state = {
            nombre: '',
            fechaInicio: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setFechaInicio = this.setFechaInicio.bind(this);
        this.cargarDatosTorneo = this.cargarDatosTorneo.bind(this);
    }   

    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((state, props) => ({
            [name]: value
        }));

    }

    setFechaInicio(date){

        this.setState((state, props) => ({
            fechaInicio: date
        }));
        
    }

    cargarDatosTorneo(){
        //MANDA LOS DATOS AL BACK        
        const data ={
            'nombre': this.state.nombre,
            'fechaInicio': this.state.fechaInicio
        }

        fetch('torneo_tfts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((info) => {
            if(info.estado === 1){
                swal(
                    <div>
                      <h1>Registrado con exito</h1>
                    </div>
                  ,{
                    icon: "success",
                    button: {
                        text: "Ok",                       
                    }
                  });
                  location.reload();
            }
            else{
                swal(
                    <div>
                      <h1>Error al registrarse</h1>
                    </div>
                  ,{
                    icon: "error",
                    button: {
                        text: "Salir",               
                    }
                  });
            }
        })
        .catch((e) => console.log('NO HAY ONDA'+e));
        
    }

    render() {
        return (
            <div>
                <h1>Completa los campos para crear torneo de TFT</h1>
                <TextField
                    id="standard-multiline-flexible"
                    name="nombre"
                    value={this.state.nombre}
                    label="Nombre Completo"
                    multiline
                    rowsMax="1"
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                <Fecha 
                    fecha={this.setFechaInicio}
                />
                <Button
                    onClick={this.cargarDatosTorneo}
                >Crear</Button>
            </div>
        );
    }
}

export default FormCrearTorneoTft;