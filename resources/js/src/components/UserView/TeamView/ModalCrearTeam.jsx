import React, { Component } from 'react';
import { Modal, Input, Grid, Button } from '@material-ui/core';


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
                            <Button>
                                asdsada
                            </Button>
                        </Grid>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalCrearTeam;