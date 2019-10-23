import React, { Component } from 'react';
import { Grid, Hidden } from '@material-ui/core';

class CajaLlave extends Component {
    constructor(props){
        super(props);

        this.state = {
            inscriptos1: [this.props.nombreInvocador,"Invocador 2","Invocador 3","Invocador 4","Invocador 5","Invocador 6","Invocador 7","Invocador 8"],
            inscriptos2: ["Invocador 1","Invocador 2","Invocador 3","Invocador 4","Invocador 5","Invocador 6","Invocador 7","Invocador 8"],
        }
    }

    render() {
        return (
            <div className="CajaLlave">
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
                        md={4}
                    >

                        {this.state.inscriptos1.map(user => (
                            <li key={user}>{user}</li>
                        ))}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        md={4}
                    >
                        <Hidden smDown>

                        <img src="/images/copa.png" alt="Copa" width="100%"/>
                        </Hidden>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="flex-end"
                        md={4}
                    >
                        {this.state.inscriptos2.map(user => (
                            <li key={user+'x'}>{user}</li>
                        ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CajaLlave;