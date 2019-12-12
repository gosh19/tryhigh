import React, { Component } from 'react';

import './TeamView.css';
import { Grid, Button } from '@material-ui/core';
import CrearTeam from './CrearTeam';

class TeamView extends Component {
    render() {
        return (
            <div className="fondo-team-section">
                <CrearTeam />
            </div>
        );
    }
}

export default TeamView;