import React, { Component } from 'react';
import { TextField, Button, MenuItem } from '@material-ui/core';

import swal from '@sweetalert/with-react';

class FormCrearNovedad extends Component {
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            texto: '',
            categoria: '', //ESTE ES PARA EL FORM
            categorias: [], //ESTE ME LLENA EL DROPDOWN
        }
        this.cargarNovedad = this.cargarNovedad.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setCategorias = this.setCategorias.bind(this);
    }

    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((state, props) => ({
            [name]: value
        }));

    }

    componentDidMount(){
        this.setCategorias();
    }
    
    setCategorias(){
        fetch('categoria_novedads')
        .then(response => response.json())
        .then(info => {
            this.setState((state,props) =>{
                return{
                    categorias: info,
                }
            })
        });
    }

    cargarNovedad(){
        const data = {
            'titulo': this.state.titulo,
            'texto':   this.state.texto,
            'categoria_id': this.state.categoria,
        }        
        try {
            fetch('novedads',{
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
                    titulo: '',
                    texto: '',
                    categoria: '',
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
                    name="titulo"
                    value={this.state.titulo}
                    label="Titulo"
                    multiline
                    rowsMax="1"
                    onChange={this.handleInputChange}
                    margin="normal"
                /><br />
                <TextField
                    id="standard-multiline-flexible"
                    name="texto"
                    value={this.state.texto}
                    label="Texto"
                    multiline
                    onChange={this.handleInputChange}
                    margin="normal"
                />
                <br />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    name="categoria"
                    value={this.state.categoria}
                    onChange={this.handleInputChange}
                    helperText="Selecciona la categoria"
                    margin="normal"
                >
                    {this.state.categorias.map(option => (
                    <MenuItem key={option.id} value={option.id} name="categoria">
                        
                        {option.tipo}
                    </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.cargarNovedad}
                >Crear</Button>
            </div>
        );
    }
}

export default FormCrearNovedad;