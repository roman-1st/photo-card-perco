import React, { FC, SetStateAction, useState } from "react";
import { Image } from "../../../types";
import { Comments } from "../../../types";
import {formDate} from "../../../utils";

interface ImageModalContainerProps {
    setViewModal: React.Dispatch<SetStateAction<string | null>>
    viewModal: string | null,
    image: Image
    comments: Comments[]
    setCommentsArray: React.Dispatch<SetStateAction<Comments[]>>
}
export const ImageModalContainer: FC<ImageModalContainerProps> = ({
    setViewModal,
    image,
    comments,
    setCommentsArray,
}) => {
    const [newComment, setNewComment] = useState<string>("")

    //Добавление нового комментария
    const handleAddComment = () => {
        setCommentsArray((prev) => [
            ...prev,
            { id: image.id, comment: newComment, date: new Date() }
        ]);
        setNewComment("");
    }

    //обработчик на Enter
    function handleAddCommentEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            handleAddComment()
        };
    }

    return (
        <div className="modal show cursor-default">
            <div className="modal-container d-flex flex-column w-auto align-items-start card h-100" >
                <h3 className="mt-1">{image.alt_description}</h3>
                    <img alt={image.alt_description} className="image-modal-lg" src={image.urls.full}/>
                <img
                    onClick={() => setViewModal(null)}
                    alt={"close modal button"} src={"./assets/closeModal.svg"} className="close-modal cursor-pointer"/>
                <div className="h-50px ">
                    <div className="pl-15">
                        <h3>Comments</h3>
                    </div>
                    <div className="w-100 p-15">
                        <input
                            className="form-control w-75 "
                            value={newComment}
                            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
                            onKeyDown={ (e: React.KeyboardEvent<HTMLInputElement>) => handleAddCommentEnter(e)}
                            placeholder="Add your comment"
                        />
                        <button onClick={handleAddComment} className="btn btn-success ml-10 fs-3">Add+</button>
                    </div>
                    <div className="list">
                        { comments.length > 0 &&
                            comments.map ((el: any, index: number) => (
                                <div key={`comment-${index}-${el.id}`} className="list-item mb-10 bg-white">
                                    <p className="mt-1 fw-bold fs-5">Date: {formDate(el.date)}</p>
                                    <p className="fs-3 mb-1">{el.comment}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};