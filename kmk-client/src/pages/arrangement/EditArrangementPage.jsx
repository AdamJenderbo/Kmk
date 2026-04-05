import '../../style/button.scss';

import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ToolBar } from '../../components/ToolBar';
import { Form } from '../Form';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { getInstrumentName } from '../../actions/instrument,';
import { download } from '../../actions/net';
import FileUpload from '../../components/FileUpload';


const Part = ({part, onSelectFile}) => {

    const onChange = (e) => {
        const file = e.target.files[0];
        console.log(part);
        onSelectFile(part.arrangementSerialNumber, part.instrument, file);
    }

    return (
        <div style={{display: "flex"}}>
            <div style={{width: "20%", margin: "auto"}}>{part.instrument === 0 ? "Partitur" : getInstrumentName(part.instrument)}</div>
            <div style={{display: "flex", width: "80%"}}>
                {!part.fileId && <div style={{width: "20", margin: 5}}><FileUpload onChange={onChange} /></div>}
                {part.fileId && part.fileId.length > 0 && <div style={{width: "20", margin: 5}}> <Button onClick={() => download(part.fileId)}>Ladda ner</Button></div>}
                {part.fileId && part.fileId.length > 0 && <div style={{width: "20", margin: 5}}><Button>Ta bort</Button></div>}
            </div>

        </div>);
}

export const EditArrangementPage = ({
    header,
    arrangement,
    load,
    save,
    edit,
    clearArrangement,
    deleteArrangement,
    uploadPart
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

    const onSelectFile = async (serialNumber, instrument, file) => {
        setLoading(true);
        await uploadPart(serialNumber, instrument, file);
        await load(params.id);
        setLoading(false);
    }

    useEffect(() => {
        onLoad();
    }, []);


    if(deleted) {
        return <Navigate to="/noter"/>;
    }

    // if(loading) {
    //     return <div style={{justifyContent: "center"}}>
    //         <div style={{display: "flex", justifyContent: "center"}}>{"Laddar..."}</div>
    //     </div>
    // }

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
                    <Form>
                        <Label label="Löpnummer">
                            <TextField source={arrangement} property="serialNumber" onEdit={edit} disabled={true}/>
                        </Label>
                        <Label label="Titel">
                            <TextField source={arrangement} property="title" onEdit={edit}/>
                        </Label>
                        <Label label="Kompositör">
                            <TextField source={arrangement} property="composer" onEdit={edit}/>
                        </Label>
                        <Label label="Arrangör">
                            <TextField source={arrangement} property="arranger" onEdit={edit}/>
                        </Label>
                        <h3>Stämmor</h3>
                        {arrangement.parts.map(part => <Part part={part} onSelectFile={onSelectFile}/>)}
                    </Form>
                </div>
            </div>
        </div>
     );
};