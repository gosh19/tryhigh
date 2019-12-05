import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

class Noticias extends Component {
    constructor(props){
        super(props);
        this.state = {
            novedades: this.props.noticias,
        }        
    }



    render() {
        
        return (
                <Grid
                    container
                    alligncontent="start"
                    direction= "row"
                    justify="flex-start"
                >
                    {this.state.novedades.map(novedad => {

                        return(
                            <div key={novedad.id}  className={novedad.categoria.tipo}>
                                <Typography variant="h2" noWrap>{novedad.titulo}</Typography>
                                
                                <p>{novedad.texto}</p>
                                <hr />
                                <small className="d-flex justify-content-end">{novedad.created_at}</small>
                            </div>
                        )
                    })}
                </Grid>
        );
    }
}

export default Noticias;