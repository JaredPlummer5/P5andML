import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import ml5 from 'ml5';

const Sketch = (props) => {
    //let myP5;
    const [label, SetLabel] = useState("");
    const [confidence, SetConfidence] = useState(0);
    const sketch = (p) => {
        let classifier;
        let img; // Declare img variable here

        p.preload = () => {
            classifier = ml5.imageClassifier('MobileNet');
            img = p.loadImage(props.uploadedImage); // Load the image here
        };

        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.background(0);
            classifier.classify(img, gotResult); // Use the img variable here
        };

        p.draw = () => {
            if (img) {
                p.image(img, 0, 0, p.windowWidth, p.windowHeight);
                p.noLoop();
            }
        };

        function gotResult(error, results) {
            if (error) {
                console.error(error);
            } else {
                console.log(results);
                SetLabel(results[0].label);
                SetConfidence(results[0].confidence * 100);
                  p.textSize(50);

                // p.text('Label: ' + results[0].label, 110, 10);
                // p.text('Confidence: ' + results[0].confidence.toFixed(2), 110, 20);
            }
        }
    };

    useEffect((p) => {
        p = new p5(sketch);

        // Return a cleanup function that will remove the p5.js sketch
        return () => {
           p.remove();
        };
    }, [props.uploadedImage]); // The empty dependency array ensures that the effect only runs once



    return (
        <div>
            <div id="canvas-container">

                
            </div>
            <div>
                <p>Label: {label}</p>
                <p>Confidence: {Math.round(confidence)}%</p>
            </div>
            
        </div>);
};

export default Sketch;

