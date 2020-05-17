import React from 'react';
import TorneoActivo from './TorneoActivo';

class TorneosView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            torneos: [],
        };
        this.getTorneos = this.getTorneos.bind(this);
        this.renderTorneos = this.renderTorneos.bind(this);
    }

    getTorneos(){
        fetch('/get-all-torneos')
        .then(response => response.json())
        .then(info => {
            console.log(info);
            
            if (info.estado) {
                this.setState({torneos:info.torneos});
            }
        })
    }

    componentDidMount(){
        this.getTorneos();
    }

    renderTorneos(){
        if ( this.state.torneos.length == 0) {
            return <h1>no hay cabida</h1>//ACA PONER AVISO DE Q NO HAY NADA PARA MOSTRAR
        }
       
        const render = this.state.torneos.map((torneo, index) => {
            return(
                <TorneoActivo key={index} torneo={torneo} />
            )
        });
         return render;
    }

    render() {
        return (
            <div
                style={{
                    backgroundImage: "url('/images/fondo-torneo.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {this.renderTorneos()}
            </div>
        );
    }
}



export default TorneosView;