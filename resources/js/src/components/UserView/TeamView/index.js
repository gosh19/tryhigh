import React, { Component } from 'react';

import './TeamView.css';
import { Grid, Button } from '@material-ui/core';
import CrearTeam from './CrearTeam';
import PanelTeam from './PanelTeam';

class TeamView extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasTeam: false,
            team: [],
        }
        this.renderPanelTeam = this.renderPanelTeam.bind(this);
        this.getInfoTeam = this.getInfoTeam.bind(this);
        this.getInfoTeam();
    }

    getInfoTeam(){
        fetch('/get-info-team')
        .then(response => response.json())
        .then(info => {
            if (info.exist) {
                
                this.setState(() => {
                    return{
                        hasTeam: true,
                        team: info.integrante[0].team_lol,
                    }
                })     
            }            
        })
    }

    renderPanelTeam(){
        if (this.state.hasTeam) {
            return (<PanelTeam team={this.state.team} />)
        }
        return <CrearTeam />;
    }

    render() {
        return (
            <div className="fondo-team-section">
                {this.renderPanelTeam()}
            </div>
        );
    }
}

export default TeamView;