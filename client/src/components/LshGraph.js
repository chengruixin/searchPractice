import { useEffect, useState } from "react";
import './LshGraph.css';

const canvasWidth = 400;
const canvasHeight = 400;
function LshGraph(){
    const [bands, setBands] = useState(10);
    const [rows, setRows] = useState(5);
    const handleClickEvent = ()=>{
        let tempBands = document.querySelector(".set-params label input[name='bands']").value;
        let tempRows = document.querySelector(".set-params label input[name='rows']").value;
        
        if(tempBands && tempRows) {
            setBands(tempBands);
            setRows(tempRows);
        }

    }
    const handleKeyUpEvent = (e) => {
        if(e.keyCode === 13) {
            handleClickEvent();
        }
    }
    useEffect(()=>{
        let canvasEl = document.querySelector("#lsh-graph");
        drawLshGraph(canvasEl, bands, rows);
    });

    return (
        <div id="lsh-graph-box" onKeyUp={handleKeyUpEvent}>
            <div className="set-params">
                <div>
                    <label>
                        Bands
                    <input type="number" className="input-sample" name="bands"></input>
                    </label>
                
                </div>
                <div>
                    <label>
                        Rows
                    <input type="number"className="input-sample" name="rows"></input>

                    </label>
                </div>
                <button className="btn" onClick={handleClickEvent}>Compute</button>
            </div>
            
            
            <canvas id="lsh-graph"></canvas>
        </div>
        
    )
}

export default LshGraph;

const drawLshGraph = (canvasEl, bands, rows)=>{
    canvasEl.width = canvasWidth;
    canvasEl.height = canvasHeight;

    const context = canvasEl.getContext("2d");
    const border = canvasEl.width / 20;
    //draw axis
    context.beginPath();
    context.moveTo(border, border);
    context.lineTo(border, canvasEl.height - border);
    context.lineTo(canvasEl.width - border, canvasEl.height - border)
    context.stroke();

    //draw curve line
    //1-(1-s^r)b
    const actualWidth = canvasEl.width - 2 * border;
    const actualHeight = canvasEl.height - 2 * border;
    context.beginPath();
    context.moveTo(border, canvasEl.height - border);
    for(let i = 0; i < 100; i++){
        let s = i/100;
        let prob = 1 - (( 1 - s ** rows) ** bands);

        //scale
        context.lineTo(border + (s * actualWidth), canvasEl.height - border - (prob * actualHeight));
        
    }

    context.stroke();
}