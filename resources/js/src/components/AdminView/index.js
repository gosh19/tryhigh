import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PanelBotonesAdmin from './PanelBotonesAdmin';
import PanelNoticias from './PanelNoticias';

class AdminView extends Component {
    render() {
        return (
            <div>
                <PanelBotonesAdmin />
                <PanelNoticias />
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