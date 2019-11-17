import React, { Component } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class CajaLlave extends Component {
    constructor(props){
        super(props);

        this.state = {
            inscriptos1: [],
            ronda: 'Loading...',
        }       

        this.setContrincantes = this.setContrincantes.bind(this);
        this.setLlave = this.setLlave.bind(this);
    }

    componentDidMount(){
        this.setContrincantes();
    }

    setContrincantes(){        
        try {
            fetch('inscriptos/llaves/'+this.props.llaveId)
            .then(response => response.json())
            .then(info => {                
                this.setState((state, props) => {                    
                    if(info.estado == 1){
                        
                        for (let index = info.llave.length; index < 8; index++) {
                            info.llave[index] = {'user_id': index,'user':{'nameInvocador': 'Loading...'}};
                            
                        }
                        return{
                            inscriptos1: info.llave,
                            ronda: 'RONDA NUMERO '+info.llave[0].llave.ronda,
                        }
                    }else{
                        info.llave = [];
                        info.llave[0] = {'user_id': this.props.userId,'user':{'nameInvocador': this.props.nombreInvocador}};
                        for (let index = 1; index < 8; index++) {
                            info.llave[index] = {'user_id': index+'bot','user':{'nameInvocador': 'Loading...'}};
                            
                        }
                       
                        return{
                            inscriptos1: info.llave,
                        }
                    }
                })
            })
        } catch (error) {
            
        }
    }

    setLlave(){        
        if (this.state.inscriptos1.length != 0) {
            
            const llave = this.state.inscriptos1.map(user => (
                                <li key={user.user_id}>
                                    {user.user.nameInvocador} 
                                    <a className="link-llave" href={'https://lolchess.gg/profile/las/'+user.user.nameInvocador}>Ver<SearchIcon /></a>
                                </li>
                            ));
            return llave;
        }
    }
    
    render() {
        return (
            <div className="CajaLlave">
                <h1>{this.state.ronda}</h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    sm={12}
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        md={6}
                    >

                        {this.setLlave()}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        md={6}
                    >
                        <Hidden smDown>

                        <img src="/images/copa.png" alt="Copa" width="100%"/>
                        </Hidden>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default CajaLlave;