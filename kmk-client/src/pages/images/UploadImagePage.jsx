import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import SelectField from '../../components/SelectField';

export const UploadImagePage = ({
    albumOptions, 
    getAlbums, 
    uploadImage
}) => {
    
    const [album, setAlbum] = useState(undefined);
    const [image, setImage] = useState(undefined);
    const [loading, setLoading] = useState(undefined);

    const onChange = (event) => {

        const file = event.target.files[0];

        setImage(file);
    }

    const onClickUpload = async () => {

        if(!image || !album || !album.album) {
            console.log("kfsm");
            return;
        }

        setLoading(true);
        await uploadImage(album.album, image);
        setLoading(false);
    }

    
    useEffect(() => {
        getAlbums();
    }, []);


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{fontWeight: "bold", fontSize: "larger", marginBottom: 5}}>Ladda upp bild</div>
                <Card>
                    <div style={{padding: 5}}>
                        <SelectField
                            source={album}
                            property="album"
                            options={albumOptions}
                            onEdit={(change) => setAlbum(change)}
                        />
                    </div>
                    <div style={{padding: 5}}>
                        <input 
                            type="file" 
                            id="img" 
                            name="img"
                            accept="image/*" 
                            onChange={onChange}
                        />
                    </div>
                    <div style={{padding: 5}}>
                        <Button 
                            onClick={onClickUpload} 
                            disabled={!image || loading} 
                            shape="rounded"
                        >
                            Ladda upp
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};