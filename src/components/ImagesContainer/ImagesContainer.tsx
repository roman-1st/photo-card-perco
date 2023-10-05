import React, {FC, memo, useState} from 'react';
import {Image} from "../../types";
import {ImageModalContainer} from "./ImageModal";
import {Comments} from "../../types";

interface PhotoContainerProps {
    images: Image[],
}
export const ImagesContainer: FC<PhotoContainerProps> = ({images}) => {
    const [viewModal, setViewModal] = useState<string | null>(null)
    const [commentsArray, setCommentsArray] = useState<Comments[]>([])

    return (
        <div className="w-100 grid-6-col">
            {images.length > 0 && images.map ( (el) => (
                <React.Fragment key={`image-uid-${el.id}`}>
                    <div
                        className="grid-6-col-item cursor-pointer"
                        onClick={() => {
                            setViewModal(el.id);
                        }}
                    >
                        <img
                            alt={el.alt_description}
                            className="image-sm"
                            src={el.urls.thumb}
                        />
                    </div>
                    {viewModal === el.id && (
                        <ImageModalContainer
                            image={el}
                            viewModal={viewModal}
                            setViewModal={setViewModal}
                            comments={commentsArray.filter ( (comment: any) => comment.id === el.id)}
                            setCommentsArray={setCommentsArray}
                        />
                    )}
                </React.Fragment>

            ))}

        </div>
    );
};

