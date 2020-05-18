import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
    return{
        root:{
            padding: 20,
        },
        cajaTorneo:{
            padding: 20,
            border: '2px solid rgb(247, 169, 6)',
            background: 'rgba(255, 255, 255, 0.5)'
        },
        cajaVersus:{
            padding:15,
            border: '2px solid rgb(159, 109, 4)',
            marginBottom:10,
        }
    }
});

const CajaVersus = (llave) => {
    const classes = useStyles();
    const [team1, setTeam1] = React.useState({sigla:null,logo:null});
    const [team2, setTeam2] = React.useState({sigla:null,logo:null});

    React.useEffect(()=> {
        if (llave.team1 != null) {
            if (llave.team1.logo != null) {
                setTeam1({ sigla:llave.team1.sigla, logo:llave.team1.logo.url});
            }else{

                setTeam1({...team1, sigla:llave.team1.sigla});
            }
        }
        if (llave.team2 != null) {
            if (llave.team2.logo != null) {
                setTeam2({ sigla:llave.team2.sigla, logo:llave.team2.logo.url});
            }else{

                setTeam2({...team2, sigla:llave.team2.sigla});
            }
        }
    },[]);
    
    if (llave.ronda == 4) { //FINAL
        return( 
            <Grid 
                container
                justify="center"
                className={classes.cajaVersus}
            >
                <Grid item xs={4}>
                    <Grid container justify="center">
                        <Grid item>
                            Ganador:
                        </Grid>
                    </Grid> 
                </Grid>
                <Grid item xs={4}>
                    <Grid container justify="flex-end" direction="row">
                        <Grid item>
                            {llave.team1.nombre}
                        </Grid>
                        <Grid item>
                            <img width="50px" src={team1.logo} alt="" srcset=""/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <img width="100%" src="/images/copa.png" alt="" srcset=""/>
                </Grid>
            </Grid>

        );
    }

    return(
        <Grid 
            container
            justify="center"
            className={classes.cajaVersus}
        >
            <Grid item xs={5}>
                <Grid container justify="flex-start" direction="row">
                    <Grid item>
                        {team1.sigla}
                    </Grid>
                    <Grid item>
                        <img width="50px" src={team1.logo} alt="" srcset=""/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Grid container justify="center">
                    <Grid item>
                        VS
                    </Grid>
                </Grid> 
            </Grid>
            <Grid item xs={5}>
                <Grid container justify="flex-end" direction="row">
                    <Grid item>
                        <img width="50px" src={team2.logo} alt="" srcset=""/>
                    </Grid>
                    <Grid item>
                        {team2.sigla}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function TorneoActivo(props) {
    const classes = useStyles();
    const [torneo, setTorneo] = React.useState(props.torneo);

    const renderRonda = (ronda) => {
        if (torneo.llaves != null) {
            
            const llaves = torneo.llaves.filter(llave => llave.ronda == ronda);
            if (llaves.length != 0) {
                const renderRonda = llaves.map((llave, index) => {
                     const caja =  CajaVersus(llave);
                     return (<Grid item style={{width:'80%'}}>{caja}</Grid>);
                 })
     
                 return (
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{height:'100%'}}
                    >

                     {renderRonda}
                    </Grid>
                     );
                
            }else{
                const cantLlaves = torneo.cant_llaves / (Math.pow(2, (ronda-1)));
    
                let llavesVacias = [];
                for (let index = 0; index < cantLlaves; index++) {
                    const caja =  {txtTeam: '...'};
                    llavesVacias.push(caja);
                }
                const renderLlavesVacias = llavesVacias.map((caja, index) =>{
                    return (
                            <Grid item className={classes.cajaVersus} style={{width:'80%'}}>

                            <h1>{caja.txtTeam}</h1>
                            </Grid>
                    );
                })
                
                return (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{height:'100%'}}
                    >

                      {renderLlavesVacias}
                    </Grid>
                );
            }
        }
        return null;
    }


    return (
        <div
            className={classes.root}
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                className={classes.cajaTorneo}
            >
                <Grid item >
                    <h1>{torneo.name}</h1>
                </Grid>
                <Grid item >
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        className={classes.cajaTorneo}
                    >
                        <Grid item xs={3}>

                            {renderRonda(1)}
                        </Grid>
                        <Grid item xs={3}>
                            {renderRonda(2)}
                        </Grid>
                        <Grid item xs={3}>
                            {renderRonda(3)}
                        </Grid>
                        <Grid item xs={3}>
                            {renderRonda(4)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
    
}

export default TorneoActivo;