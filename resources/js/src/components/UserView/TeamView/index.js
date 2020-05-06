import React, { Component } from 'react';

import './TeamView.css';
import { Grid, makeStyles, Button } from '@material-ui/core';
import CrearTeam from './CrearTeam';
import PanelTeam from './PanelTeam';
import swal from 'sweetalert';

class TeamView extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasTeam: false,
            team: [],
            isLider: false,
        }
        this.renderPanelTeam = this.renderPanelTeam.bind(this);
        this.getInfoTeam = this.getInfoTeam.bind(this);
        this.getInfoTeam();
    }

    getInfoTeam(){
        fetch('/get-info-team')
        .then(response => response.json())
        .then(info => {
            console.log(info);
            
            if (info.exist) {
                
                this.setState(() => {
                    return{
                        isLider: info.integrante.lider,
                        hasTeam: true,
                        team: info.integrante.teamlol,
                    }
                })     
            }            
        })
    }

    renderPanelTeam(){
        if (this.state.hasTeam) {
            return (<PanelTeam isLider={this.state.isLider} team={this.state.team} />)
        }
        return (
                <Grid
                    container
                    justify="center"
                >
                    <CrearTeam />
                    <InvitacionesRecibidas />
                </Grid>
            );
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

const useStyles = makeStyles(() => ({
    invitation:{
        marginTop:20,
        padding:15,
        border: '2px solid #885E2B',
        borderRadius:15,
        maxWidth: 800,
        background:'rgba(211, 134, 39, 0.9)',
        color:'rgb(36, 15, 14)',
    },
    btnAccept:{
        background:'rgb(83, 50, 9)',
        color:'#FFF',
        fontWeight:'bold'
    }
}));

function InvitacionesRecibidas(props) {
    const classes = useStyles();
    const [invitaciones, setInvs] = React.useState([]);

    React.useEffect(() => {
        fetch('/get-invitaciones-user')
        .then(response => response.json())
        .then(info => {
            
            if (info.estado) {
                setInvs(info.invitations);
            }
        })
    },[]);

    const acceptInvitation = (id) =>{
        fetch('/accept-invitation/'+id)
        .then(response => response.json())
        .then(info => {
            if (info.estado) {
                location.reload();
            }else{
                swal('Error', info.error, 'error');
            }
        })
    }
    
    return(
        <Grid
            container
            justify="center"
        >
            {invitaciones.map((inv, index)=>{
                return (
                        <Grid
                            container
                            justify="space-between"
                            className={classes.invitation}
                        >
                            <Grid item>
                                <h4>Invitacion enviada por <strong>{inv.sender.nameInvocador}</strong> el {inv.created_at} </h4>
                            </Grid>
                            <Grid item>

                            <Button 
                                className={classes.btnAccept}
                                onClick={()=> acceptInvitation(inv.id)}
                            >Aceptar</Button>
                            <Button 
                                className={classes.btnAccept}
                                onClick={()=> acceptInvitation(inv.id)}
                            >Rechazar</Button>
                            </Grid>
                        </Grid>
                    );
            })}
        </Grid>
    );
}