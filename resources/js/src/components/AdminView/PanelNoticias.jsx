import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import FormCrearCategoria from './FormCrearCategoria';
import FormCrearNovedad from './FormCrearNovedad';

class PanelNoticias extends Component {
    render() {
        return (
            <div>
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
                        <FormCrearCategoria />
                    </Grid>
                    <Grid
                        item
                        justifty="center"
                        allingitems="center"
                        md={6}
                    >
                        <FormCrearNovedad />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PanelNoticias;