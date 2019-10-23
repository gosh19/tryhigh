import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';


class Footer extends Component {
    render() {
        return (
            <div className='bg-dark'>
                <Container>
                    <Grid 
                        container
                        alligncontent='center'
                        allignitems='center'
                        direction='row'
                        justify='center'
                    >
                        <Grid
                            container
                            direction='column'
                            md={6}
                            >
                            <h4>Redes</h4>
                        </Grid>
                        <Grid
                            container
                            direction='column'
                            md={6}
                        >
                            <h4>Datos de contacto</h4>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Footer;

