// Debe aceptar el ID de la pregunta y el de la auditoría como entrada
import React from 'react';
//import Plot from 'react-plotly.js';

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const PreguntaGrafica = (props) => {
    const Plot = createPlotlyComponent(Plotly);
    const {count} = props

    return (
        <Plot
            data={[
                {
                    values: [count.no, count.yes],
                    labels: ['No', 'Yes'],
                    type: 'pie',
                    marker: {
                        colors: ["blue", "#eeeeee"]
                    },
                },
            ]}
            layout={{
                width: 200, height: 200, //title: 'Plot Name', //Prueba a comentar esta linea
                paper_bgcolor:'rgba(0,0,0,0)',
                plot_bgcolor:'rgba(0,0,0,0)',
                showlegend: false,
                margin: {t:0, b:0, l:0, r:0} //dict(t = 0, b = 0, l = 0, r = 0)
                }}
        />
    );
}

export default PreguntaGrafica