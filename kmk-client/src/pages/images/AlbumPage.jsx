import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { useOutsideClick } from '../../effects/outsideClickEffect';

const Image = ({image, onClick}) => {

    return (
        <div style={{margin: 10}} onClick={() => onClick(image)}>
            {<img src={`http://localhost:5072/api/image/${image.id}`} width={300} height={180}></img>}
        </div>);
}


export const AlbumPage = ({album, getAlbum}) => {
    
    let { id } = useParams();

    const [selectedImage, setSelectedImage] = useState(undefined);

    useEffect(() => {
        getAlbum(id);
    }, []);


    const onClickImage = (image) => {
        setSelectedImage(image);
    }

    const onClickOutsideImage = () => {
        setSelectedImage(undefined);
    }

    const ref = useOutsideClick(onClickOutsideImage);



    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {selectedImage && <div ref={ref} style={{position: "absolute"}}>
                <img src={`http://localhost:5072/api/image/${selectedImage.id}`} width="auto" height={880}></img>
            </div>}
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{fontWeight: "bold", fontSize: "larger", marginBottom: 5}}>{album.title}</div>
                {<div style={{display: "flex", flexWrap: "wrap"}}>{album.images.map(image => <Image image={image} onClick={onClickImage}></Image>)}</div>}
            </div>
        </div>
    );
};