import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import ModalCrearTeam from './ModalCrearTeam';

class CrearTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        }
        this.openModalCrearTeam = this.openModalCrearTeam.bind(this);
    }

    openModalCrearTeam(){
        this.setState((state, props) => {
            return{
                open: true,
            }
        })
    }

    render() {
        
        return (
            <div className="crear-team-section">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        className="seccion-crear-team"
                    >
                        <div className="justify-content-center">
                            <h1>Aun no estas inscripto en ningun team</h1>
                            <h2>Puedes crear o unirte a uno</h2>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >

                            <Button
                                variant="contained"
                                color="primary"
                                className="boton-crear-team"
                                onClick={this.openModalCrearTeam}
                            >Crear Team 5v5</Button>

                            
                            </Grid>
                            <ModalCrearTeam 
                                open={this.state.open}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CrearTeam;