import '../../style/button.scss';

import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ToolBar } from '../../components/ToolBar';
import { Card } from '../../components/Card';
import { Form } from '../Form';
import TextField from '../../components/TextField';
import Label from '../../components/Label';

export const EditArrangementPage = ({
    header,
    arrangement,
    load,
    save,
    edit,
    clearArrangement,
    deleteArrangement
}) => {

    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const params = useParams();

    const onLoad = async () => {

        if(!params.id) {
            return;
        }

        clearArrangement();
        
        setLoading(true);
        console.log(params.id);
        await load(params.id);
        setLoading(false);
    };


    const onSave = async () => {
        setLoading(true);
        await save();
        setLoading(false);
    }

    const onDelete = async () => {
        setLoading(true);
        await deleteArrangement();
        setLoading(false);
        setDeleted(true);
    }

    useEffect(() => {
        onLoad();
    }, []);


    if(deleted) {
        return <Navigate to="/noter"/>;
    }

    if(loading) {
        return <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
            {"Laddar..."}
        </div>
    }

    console.log(arrangement.parts)
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>    
                <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
                <ToolBar 
                    onSave={onSave}
                    onDelete={onDelete}  
                    loading={loading} 
                    saveDisabled={!arrangement.dirty}
                />
                <div className='col'>
                    <Card padding={true}>
                        <Form>
                            {/* <div className='row'> */}
                                <Label label="Löpnummer">
                                    <TextField source={arrangement} property="serialNumber" onEdit={edit} disabled={true}/>
                                </Label>
                                <Label label="Titel">
                                    <TextField source={arrangement} property="title" onEdit={edit}/>
                                </Label>
                            {/* </div> */}
                            {/* <div className='row'> */}
                                <Label label="Kompositör">
                                    <TextField source={arrangement} property="composer" onEdit={edit}/>
                                </Label>
                                <Label label="Arrangör">
                                    <TextField source={arrangement} property="arranger" onEdit={edit}/>
                                </Label>
                            {/* </div> */}
                        </Form>
                    </Card>
                    {/* <h3>Stämmor</h3>
                    <Card>
                        <Table 
                            colums={[{
                                header: "Instrument",
                                property: "instrument",
                                dataType: "select",
                                options: instrumentOptions,
                                edit: true
                            }, {
                                header: "Antal",
                                property: "count",
                                dataType: "text",
                                edit: true
                            }]}
                            onEditRow={onEditPart}
                            rows={arrangement.parts}
                            onNewRow={onNewRow}
                            onClickRemoveRow={onClickRemoveRow}
                        />
                    </Card> */}
                </div>
            </div>
        </div>
     );
};