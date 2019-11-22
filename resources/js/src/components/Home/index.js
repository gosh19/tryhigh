import React, { Component } from 'react';
import {  Grid, Paper, Typography, TextField, Button, Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Card from '../material/Card';

import './Home.css';


class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.salir = this.salir.bind(this);
    }

    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((state, props) => ({
            [name]: value
        }));

    }

    salir(){
        document.getElementById('logout-form').submit();
    }
    render() {
        return (
            <div className="general"> 
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
                        sm={6}
                    >
                        <Card 
                            title="Team Figth Tactics" 
                            img="https://esports.eldesmarque.com/wp-content/uploads/2019/08/teamfight_tactics.6.jpg"
                            h1="Team Figth Tactics"
                            text="Preparate para el primer torneo de TFT de Latinoameria. ¡Planifica tu formacion y preparate para enfrentar a tu rivales!"
                        />
                    </Grid>
                    <Grid
                        className="p-5 "
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xs={12}
                        sm={6}
                    >
                        <button 
                            type="button" 
                            style={{fontSize: '2em'}} 
                            className="btn btn-block btn-danger p-3"
                            onClick={this.props.funcIns}
                        >¡Registrarme!</button>
                        <button 
                            type="button" 
                            style={{fontSize: '2em'}} 
                            className="btn btn-block btn-primary p-3"
                            onClick={() => window.location.replace("/login")}
                        >¡Ingresar!</button>
                    </Grid>
                </Grid>
                <hr/>
                <hr/>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="p-3"
                    sm={12}
                >
                    <div className="paper-login justify-content-center" > 
                        <h3 className="titulo-form-login" >¿Ya estas registrado? <a href="/login"> Ingresa!</a></h3>
                    </div>                   
                </Grid>
            </div>
        );
    }
}

export default Home;