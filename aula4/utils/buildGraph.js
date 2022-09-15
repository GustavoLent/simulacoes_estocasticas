// Install libs with: npm i chartjs-node-canvas chart.js
// Docs https://www.npmjs.com/package/chartjs-node-canvas
// Config documentation https://www.chartjs.org/docs/latest/axes/
import fs from 'fs';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 1000; //px
const height = 1000; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });

export default async function buildGraph({ Xs = [], Ys = [], filename, colors = ['rgb(51, 204, 204)'] }) {
    const configuration = {
        type: 'scatter',
        data: {
            labels: Xs,
            datasets: [{
                label: "Sample 1",
                data: Ys,
                fill: false,
                borderColor: colors,
                borderWidth: 1,
                xAxisID: 'xAxis1' //define top or bottom axis ,modifies on scale
            }
            ],
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                }
            }
        }
    }

    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const base64Image = dataUrl

    var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

    return Promise.resolve(fs.writeFile(`${filename}.png`, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    }));
}