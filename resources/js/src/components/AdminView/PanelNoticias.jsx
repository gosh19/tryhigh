import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import FormCrearCategoria from './FormCrearCategoria';
import FormCrearNovedad from './FormCrearNovedad';

class PanelNoticias extends Component {
    render() {
        return (
            <div>
                <Container>
                <h1>Seccion Novedades</h1>
                <hr />
                <Grid
                    container
                    direction="row"
                    justifty="center"
                    allingitems="center"
                >
                    
                    <Grid
                        item
                        justifty="center"
                        allingItems="center"
                        md={6}
                    >
                        <h2>Cargar Categoria</h2>
                        <FormCrearCategoria />
                    </Grid>
                    <Grid
                        item
                        justifty="center"
                        allingitems="center"
                        md={6}
                    >   
                        <h2>Cargar Novedad</h2>
                        <FormCrearNovedad />
                    </Grid>
                </Grid>
                </Container>
            </div>
        );
    }
}

export default PanelNoticias;