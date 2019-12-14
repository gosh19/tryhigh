import React, { Component } from 'react';
import { Modal, Input, Grid } from '@material-ui/core';


class ModalCrearTeam extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    componentWillReceiveProps(){
        
        this.setState((state, props) => {
            return {
                open: props.open,
            }
        })
    }
    render() {
        console.log('estado xd '+this.state.open);

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

                            />
                            <Input 
                                autoFocus={true}
                                name="siglaTeam"
                                placeholder="Sigla"
                                required

                            />
                        </Grid>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalCrearTeam;