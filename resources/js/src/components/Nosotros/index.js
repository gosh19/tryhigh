import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import Card from '../material/Card';

import './Nosotros.css'

class Nosotros extends Component {

    render() {
        const text = "Somos una empresa de organizaciond e torneos On-Line, enfocada actualmente en competencias referidas"
            +"al League of Legends. Nuestra idea es poder acercar la experiencia competitiva de un torneo a todos los jugadores.\n"
            +"Estamos enfocandonos en que cada participante tenga la mejor experiencia posible. En cada torneo habra:"
            +" premios para los gandores, sorteos y participaciona ctiva de los organizadores para que no haya ningun tipo de inconveniente."
            +"\n\r Todas las dudas pueden dirigirlas al instagram de la organizacion."
        return (
            <Grid
                container
                direction="row"

            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    md={6}
                    className="img-nosotros"
                >
                    <img src="https://las.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/devarticle_header_05.jpg?itok=oTvmzFjt"
                            width="100%"
                    />
                </Grid>
                <Grid
                    item
                    direction="column"
                    md={6}
                >
                    <Card 
                        h1="TryHigh Torneos"
                        title="TryHigh Torneos"
                        img="/images/thlogo.png"
                        text= {text}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Nosotros;