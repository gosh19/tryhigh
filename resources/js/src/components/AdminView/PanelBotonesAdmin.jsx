import React, { Component } from 'react';
import { Grid, Button, Grow  } from '@material-ui/core';
import VistaUsers from './VistaUsers';
import FormCrearTorneoTft from './FormCrearTorneoTft';

class PanelBotonesAdmin extends Component {
    constructor(){
        super();
        this.state = {
            estadoTableUsers: false,
            mostrarFormTorneo: false,
        }
        this.mostrarTableUsers = this.mostrarTableUsers.bind(this);
        this.mostrarFormTorneo = this.mostrarFormTorneo.bind(this);
    }

    mostrarTableUsers(){
        this.setState({
                estadoTableUsers: !this.state.estadoTableUsers,         
        });
    }

    mostrarFormTorneo(){
        this.setState({
            mostrarFormTorneo: !this.state.mostrarFormTorneo,         
        });
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    allingItems="center"
                >
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        allingItems="center"
                    >
                        <Button
                            onClick={this.mostrarFormTorneo}
                        >Crear Torneo</Button>
                        <Grow mountOnEnter unmountOnExit in={this.state.mostrarFormTorneo}>
                            <div>
                                <FormCrearTorneoTft />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PanelBotonesAdmin;