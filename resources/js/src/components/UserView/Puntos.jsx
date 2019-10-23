import React, { Component } from 'react';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import './UserView.css';

class Puntos extends Component {
    render() {
        return (
            <div className="Puntos">
                <ConfirmationNumberIcon />
                <strong className="ml-2">0</strong>
            </div>
        );
    }
}

export default Puntos;