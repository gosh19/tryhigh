import React, { Component } from 'react';
import { Grid, Container } from '@material-ui/core';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <Container>
                    <Grid 
                        container
                        className="p-3"
                        alligncontent='center'
                        allignitems='center'
                        direction='row'
                        justify='center'
                    >
                        <Grid
                            item
                        >
                            <Grid
                                container
                                direction='column'
                                >
                                <div className="d-inline-block">

                                    <InstagramIcon 
                                    className="mr-2"
                                    />
                                    <a href="https://www.instagram.com/tryhigh_torneos/">Instagram</a>
                                </div>
                                <div className="d-inline-block">

                                    <FacebookIcon 
                                    className="mr-2"
                                    /><a href="https://www.facebook.com/TryHigh-Torneos-107692350688475/">Facebook</a>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Footer;

