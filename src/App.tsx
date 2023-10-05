import React, { useState } from 'react';
import {SearchContainer} from "./components/SearchContainer";
import {ImagesContainer} from "./components/ImagesContainer";
import {Image} from "./types";

export default function App() {
    const [images, setImages] = useState<Image[]>([])

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="w-75 justify-content-center flex-column mt-20 min-w-350px">
                <SearchContainer
                    setImages={setImages}
                />
                <ImagesContainer
                    images={images}
                />
            </div>
        </div>
    );
}