import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Album = ({album}) => {

    const coverImage = album.images.length > 0 ? album.images[0] : undefined;


    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/bilder/album/${album.id}`);
    }

    return (
        <div style={{
            display: "block", 
            margin: 10}}
        >
            <div>
                {coverImage && <img 
                    src={`http://localhost:5072/api/image/${coverImage.id}`} 
                    width={300} 
                    height={180} 
                    onClick={onClick} 
                    style={{cursor: "pointer"}}
                />}
            </div>
            <div 
                style={{textAlign: "center", fontWeight: "bold"}}
            >
                {album.title}
            </div>
        </div>
    );
}


export const AlbumsPage = ({albums, getAlbums, getImage}) => {
    
    useEffect(() => {
        getAlbums()
    }, []);


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {albums.map(album => <Album album={album}/>)}
                </div>
            </div>
        </div>
    );
};