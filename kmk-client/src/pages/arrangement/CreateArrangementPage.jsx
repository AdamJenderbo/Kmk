import '../../style/button.scss';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolBar } from '../../components/ToolBar';
import { Card } from '../../components/Card';
import { Form } from '../Form';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import Button from '../../components/Button';

export const CreateArrangementPage = ({
    clear,
    create,
    edit,
    header,
    source
}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    const onLoad = async () => {
        clear();
    };

    const onCreate = async () => {
        setError(undefined);
        setLoading(true);
        const response = await create();
        setLoading(false);

        if(response.isSuccess) {
            navigate("/noter");
        }
        else {
            setError(response.message);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    if(loading) {
        return <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
            {"Laddar..."}
        </div>
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>    
                <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
                <ToolBar 
                    onCreate={onCreate} 
                    loading={loading} 
                    saveDisabled={!source.dirty}
                />
                {error && <div style={{color: "red", marginBottom: 10}}>{error}</div>}
                <div className='row'>
                    <Card padding={true}>
                        <Form>
                            <Label label="Löpnummer">
                                <TextField source={source} property="serialNumber" onEdit={edit}/>
                            </Label>
                            <Label label="Titel">
                                <TextField source={source} property="title" onEdit={edit}/>
                            </Label>
                            <Label label="Kompositör">
                                <TextField source={source} property="composer" onEdit={edit}/>
                            </Label>
                            <Label label="Arrangör">
                                <TextField source={source} property="arranger" onEdit={edit}/>
                            </Label>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
     );
};