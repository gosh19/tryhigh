import React, { Component } from 'react';
import { Modal, Input, Grid, Button } from '@material-ui/core';
import swal from 'sweetalert';


class ModalCrearTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            teamName: '',
            siglaTeam: '',
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createTeam = this.createTeam.bind(this);
    }

    handleOpen(){
        this.setState((state, props) => {
            return {
                open: true,
            }
        })
    }
    handleClose(){
        this.setState((state, props) => {
            return {
                open: false,
            }
        })
    }

    handleInputChange(e){  
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name == "siglaTeam" )  {
            if (value.length <4) {  //PARA Q NO TENGA MAS DE 3 LETRAS
                
                this.setState((state, props) => ({
                    [name]: value.toUpperCase(),
                }));
            }
        }else{

            this.setState((state, props) => ({
                [name]: value
            }));
        }

    }

    createTeam(){
        const data ={
            name: this.state.teamName,
            sigla: this.state.siglaTeam
        }
        fetch('/TeamLol',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            credentials: 'same-origin',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(info => {
            if (info.estado) {
                swal('Great!', 'Equipo creado con exito', 'success');
                location.reload();
            }
        })
        
    }

    componentWillReceiveProps(){
        
        this.setState((state, props) => {
            return {
                open: props.open,
            }
        })
    }
    render() {

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className="modal-crear-team">
                    <h2 id="simple-modal-title">Crea tu Team!</h2>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Input 
                                autoFocus={true}
                                name="teamName"
                                placeholder="Nombre de tu Team"
                                required
                                value={this.state.teamName}
                                onChange={this.handleInputChange}
                            />
                            <Input 
                                name="siglaTeam"
                                placeholder="Sigla"
                                required
                                value={this.state.siglaTeam}
                                onChange={this.handleInputChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.createTeam}
                            >
                                Crear
                            </Button>
                        </Grid>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalCrearTeam;