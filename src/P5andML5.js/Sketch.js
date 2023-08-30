import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import ml5 from 'ml5';
import './Sketch.css';
const Sketch = (props) => {
    //let myP5;
    // const [label, SetLabel] = useState("");
    // const [confidence, SetConfidence] = useState(0);
    const sketch = (p) => {
        let mobileNet;

        let video;

        p.preload = () => {
            mobileNet = ml5.imageClassifier('MobileNet');
            //img = p.loadImage(props.uploadedImage); // Load the image here
        };

        p.setup = () => {
      
             p.createCanvas(640, 480);
            video = p.createCapture(p.VIDEO);
            video.size(640, 480); // Adjust the video size here
            mobileNet.classify(video, gotResult); // Use the img variable here
            video.parent("canvas-container");
            p.noLoop();

        };

        p.draw = () => {
            // p.image(video, 0, 0, p.width, p.width * video.height / video.width);
            //p.filter();

        };

        function gotResult(error, results) {

            if (error) {
                console.error(error);
            } else {
                console.log(results);
                let label = results[0].className;
                let prob = results[0].probability;
                p.fill(0);
                // p.textSize(64);
                // p.text(label, 10, p.height - 100);
            }

        };

    };
    useEffect((p) => {
        p = new p5(sketch);

        // Return a cleanup function that will remove the p5.js sketch
        return () => {
            p.remove();
        };
    }); // The empty dependency array ensures that the effect only runs once



    return (
        <div>
            <div id="canvas-container">
                {/* This will contain the canvas */}
            </div>
            <div>
                {/* Uncomment these when you want to display them */}
                {/* <p>Label: {label}</p>
                <p>Confidence: {Math.round(confidence)}%</p> */}
            </div>
        </div>

    );
}
export default Sketch;

