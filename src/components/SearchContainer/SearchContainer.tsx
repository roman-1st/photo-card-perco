import React, {FC, memo, SetStateAction, useEffect, useState} from 'react';
import {getImageEndpoint} from "../../api";
import {Image} from "../../types";

interface SearchContainerProps {
    setImages: React.Dispatch<SetStateAction<Image[]>>
}
export const SearchContainer: FC<SearchContainerProps> = memo(({  setImages}) => {
    const [title, setTitle] = useState<string>("car")
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [noImages, setNoImages] = useState<boolean>(false)


    //Отправка запроса при иницализации приложения
    useEffect(() => {
        if(isLoading) {
            setNoImages(false)
            getImageEndpoint(page, title)
                .then( (res) => {
                    if (res) {
                        setImages((prev: Image[]) => [...prev, ...res]);
                        setPage((prev) => prev + 1);
                    }
                })
                .finally( () => {
                    setIsLoading(false)
                })
        }
    }, [isLoading]);

    //Добавление и отчиска слушателя на обработчик скролла
    useEffect(() => {
        document.addEventListener("scroll", handleScroll)

        return function () {
            document.removeEventListener("scroll", handleScroll)
        }
    }, []);


    //Обработчик скролла для бесконечной подгрузки
    const handleScroll = (e: any) => {
        const height = e.target.documentElement.scrollHeight
        const top = e.target.documentElement.scrollTop
        const innerHeight = window.innerHeight
        // console.log((height - (innerHeight + top) < 100))
        if (height - (innerHeight + top) < 100) {
            setIsLoading(true)
        }
    }

    //Отправка запроса на получение 1 страницы изображений при поиске
    const handleLoadImages = () => {
        setNoImages(false)
        getImageEndpoint(1, title)
            .then( res => {
                if(!res.length) {
                    setNoImages(true)
                }
                setImages(res);
            })
            .then( () => {
                setIsLoading(false);
                setPage(2)
            })
    }

    //Отправка запроса по нажатию Enter
    function handleLoadImagesEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            handleLoadImages()
        };
    }

    return (
        <div className="d-flex align-center justify-content-center flex-column">
            <div>
                <input className="form-control w-200px w-auto"
                       placeholder="Car, apple, dog..."
                       value={title}
                       onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleLoadImagesEnter(e)}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value) }
                />
                <button className="btn btn-primary ml-10" onClick={handleLoadImages}>Search</button>
            </div>
            {noImages && (<p className="text-danger">Error: No current images</p>)}
        </div>

    );
});