import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

class Noticias extends Component {
    constructor(props){
        super(props);
        this.state = {
            novedades: this.props.noticias,
        }        
        this.cargarNoticias = this.cargarNoticias.bind(this);
    }

    cargarNoticias(){
        //LLAMO A LaS NOTICIAS EN LA BD Y LOS EMTO EN UN ARRAY

        const noticia = 
            <div className="p-4">
                <h2>Titulo</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque molestiae animi, neque dicta vero ipsum harum officia error velit facere excepturi dolor quae maiores adipisci fugiat, cum accusantium eum nihil!</p>
            </div>;

        return noticia;
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
                                <h2>{novedad.titulo}</h2>
                                <p>{novedad.texto}</p>
                                <small className="d-flex justify-content-end">{novedad.created_at}</small>
                            </div>
                        )
                    })}
                </Grid>
        );
    }
}

export default Noticias;