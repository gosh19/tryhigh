import React, { Component } from 'react';
import { TextField, Container, Grid, Button } from '@material-ui/core';

import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import swal from '@sweetalert/with-react'

class Inscripcion extends Component {
    constructor(props){
        super(props);
        this.state= {
            name:'',
            email:'',
            nameInvocador:'',
            password:'',
            confpassword:'',
        }

        this.registro = this.registro.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        
    }

    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((state, props) => ({
            [name]: value
        }));

    }

    registro(){
        //MANDA LOS DATOS AL BACK        
        const data ={
            'name': this.state.name,
            'email': this.state.email,
            'nameInvocador': this.state.nameInvocador,
            'password': this.state.password
        }

        fetch('registro',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((info) => {
            console.log(info);
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

        let btnRegistro = true;
        let iconPass = <ReportProblemIcon 
                            color="secondary"
                        />;
        
                            
        if ((this.state.password !== '') && (this.state.confpassword !== '')) {
            if(this.state.password === this.state.confpassword){
                iconPass = <CheckBoxRoundedIcon
                color="primary"
                />;
                if((this.state.name !== '') && (this.state.email !== '') && (this.state.nameInvocador !== '')){
                    btnRegistro = false;

                }
            }
        }
        
        return (
            <div >
                <Container>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        sm={12}
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            xs={12}
                            sm={4}
                            className="bg-light p-5 rounded"
                        >   
                            <h1>¡Registro!</h1>
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="name"
                                    value={this.state.nombre}
                                    label="Nombre Completo"
                                    multiline
                                    rowsMax="1"
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth={true}
                                    />
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="email"
                                    value={this.state.mail}
                                    label="Correo electronico"
                                    multiline
                                    type="email"
                                    rowsMax="1"
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth={true}
                                    />
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="nameInvocador"
                                    value={this.state.nombreInvocador}
                                    label="Nombre de Invocador"
                                    multiline
                                    rowsMax="1"
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth={true}
                                    
                                    />
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="password"
                                    value={this.state.contraseña}
                                    label="Contraseña"
                                    type="password"
                                    rowsMax="1"
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    fullWidth={true}
                                    />
                                
                                <TextField
                                    id="standard-multiline-flexible"
                                    name="confpassword"
                                    value={this.state.confContraseña}
                                    label="Confirmacion Contraseña"
                                    type="password"
                                    onChange={this.handleInputChange}
                                    rowsMax="1"
                                    margin="normal"
                                    fullWidth={true}
                                    />
                                    <div>
                                        {iconPass}
                                    </div>
                                    <br/>
                                <Button
                                    type="button"
                                    disabled={btnRegistro}
                                    color="primary"
                                    fullWidth={true}
                                    variant="contained"
                                    onClick={this.registro}
                                >
                                    Registrarme
                                </Button>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            sm={1}
                        ></Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            xs={12}
                            sm={6}
                        >
                            <img    
                                width="100%"
                                alt="Pingu-TFT"
                                src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/tft-microsite/es_MX/4627a7b383b9145327c711513ad2dc731c3c7f2d/assets/images/floating-3.png"
                            />
                        </Grid>
                    </Grid>

                </Container>
       
            </div>
        );
    }
}

export default Inscripcion;

