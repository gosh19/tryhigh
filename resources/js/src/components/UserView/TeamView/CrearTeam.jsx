import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class CrearTeam extends Component {
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
                        direction="column"
                        className="seccion-crear-team"
                        justify="center"
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
                                >Crear Team 5v5</Button>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CrearTeam;