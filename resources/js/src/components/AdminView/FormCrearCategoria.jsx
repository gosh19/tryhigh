import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

import swal from '@sweetalert/with-react';

class FormCrearCategoria extends Component {
    constructor(props){
        super(props)
        this.state = {
            tipo: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.cargarCategoria = this.cargarCategoria.bind(this);
    }
    
    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((state, props) => ({
            [name]: value
        }));

    }
    cargarCategoria(){
        const data = {
            'tipo': this.state.tipo,
        }
        try {
            fetch('categoria_novedads',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "same-origin",
                body: JSON.stringify(data)
    
            })
            .then(response => response.json())
            .then(info => {
                if (info.estado == 1) {
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
                }
            });
            
            this.setState((state,props) => {
                return{
                    tipo: '',
                }
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    render() {
        return (
            <div>
                <TextField
                    id="standard-multiline-flexible"
                    name="tipo"
                    value={this.state.tipo}
                    label="Tipo"
                    multiline
                    rowsMax="1"
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.cargarCategoria}
                >Crear</Button>
            </div>
        );
    }
}

export default FormCrearCategoria;