import React, { useEffect, useState } from "react";
import "./Painting.css";

export const Painting = ({imageUrl: imageUrlProp, name, delay, theme}) => {
    const [imageUrl, setImageUrl] = useState();
    // Данная функция нужна для того, чтобы загружать изображение с некоторой задержкой и не нагружать сервер, иначе сервер не отдает часть картинок
    useEffect(() => {
        const loadingImage = setTimeout(() => {
            setImageUrl(imageUrlProp)
        }, delay)
        return () => {
            clearTimeout(loadingImage)
        }
    }, [imageUrlProp, delay])
    if (!imageUrl) {
        return null
    }
    return (
        <div className='picture'>
            <img src={`https://test-front.framework.team${imageUrl}`} alt={name} className='picture-img'/>
            <p className={`${theme === 'light' ? 'picture-name' : 'picture-name dark-theme'}`}
               title={name}>{name.length > 15 ? `${name.slice(0, 25)}...` : name}</p>
        </div>
    )
}