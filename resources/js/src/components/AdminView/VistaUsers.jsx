import React, { Component } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class VistaUsers extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
        };
        this.cargarUsers = this.cargarUsers.bind(this);

        
    }

    componentDidMount(){
        this.cargarUsers();
    }

    cargarUsers(){

        fetch('users',{
            method: 'GET',
        })
        .then(response => response.json()
        )
        .then(users => {
            this.setState({
                users: users,
            })
        }
        );
        
    }

    render() {        
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell>#</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Nombre Invocador</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Inscripto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.users.map((user)=>
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.nameInvocador}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.rol_id}</TableCell>
                                <TableCell>----</TableCell>
                            </TableRow>
                            )
                        }
                    
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default VistaUsers;