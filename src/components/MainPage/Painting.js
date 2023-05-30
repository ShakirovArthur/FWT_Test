import React, {useEffect, useState} from "react";
import './painting.css'

export const Paintitng = ({imageUrl: imageUrlProp,name,delay,theme}) => {
    const [imageUrl,setImageUrl] = useState();
    useEffect(() => {
        const loadingImage = setTimeout(() => {
            setImageUrl(imageUrlProp)
        },delay)
        return () => {
            clearTimeout(loadingImage)
        }
    },[imageUrlProp,delay])
    if(!imageUrl){
        return null
    }
    return(
        <div className='picture'>
            <img src={`https://test-front.framework.team${imageUrl}`} alt={name} className='picture-img'/>
            <p className={`${theme === 'light' ? 'picture-name' : 'picture-name dark-theme'}`} title={name}>{name.length > 15 ? `${name.slice(0,25)}...` : name}</p>
        </div>
    )
}