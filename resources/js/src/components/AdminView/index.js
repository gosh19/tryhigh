import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PanelBotonesAdmin from './PanelBotonesAdmin';
import PanelNoticias from './PanelNoticias';
import Torneos from './Torneos';

class AdminView extends Component {
    render() {
        return (
            <div>
                <PanelBotonesAdmin />
                <PanelNoticias />
                <hr />
                <Torneos /> 
            </div>
        );
    }
}


if(document.getElementById('AdminView')){
    ReactDOM.render(
        <AdminView />, 
        document.getElementById('AdminView')
    );
}