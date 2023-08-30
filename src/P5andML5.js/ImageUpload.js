import React, { useState } from 'react';
import Sketch from './Sketch';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <form className="mt-4">
                <div
                    className="border p-4 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{ minHeight: '200px' }}
                >
                    {image ? (
                        <img src={image} alt="Preview" style={{ maxWidth: '100%' }} />
                    ) : (
                        'Drag and drop an image here, or click to select a file'
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDrop({ dataTransfer: { files: e.target.files } })}
                        style={{ display: 'none' }}
                    />
                </div>
            </form>

            
     
        </div>
    );
};

export default ImageUpload;
