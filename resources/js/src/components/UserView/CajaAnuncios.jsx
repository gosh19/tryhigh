import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Noticias from './Noticias';


class CajaAnuncios extends Component {

    render() {
        return (
            <div
                className="CajaNoticias mt-3"
            >
                <Grid   //ROW DEL TITULO
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    <Grid
                        container
                        direction= "column"
                        alligncontent="start"
                        justify="flex-start"
                        md={6}
                    >
                        <h1>Anuncios</h1>
                    </Grid>
                </Grid>
                <Grid   //ROW DE CONTENIDO
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    <div className="img-anuncio">

                    <img src="/images/1v1-torneo.jpg" width="100%" />
                    </div>
                </Grid>
            </div>
        );
    }
}

export default CajaAnuncios;