// Debe aceptar el ID de la pregunta y el de la auditoría como entrada
import React from 'react';
//import Plot from 'react-plotly.js';

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const PreguntaGrafica = () => {
    const Plot = createPlotlyComponent(Plotly);

    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                },
                { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
    );
}

export default PreguntaGrafica