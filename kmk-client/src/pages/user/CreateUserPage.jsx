import '../../style/button.scss';

import React, { useEffect, useState } from 'react';
import TextField from '../../components/TextField';
import Label from '../../components/Label';
import { connect } from 'react-redux';
import { Table } from '../../components/Table';
import { useParams } from 'react-router-dom';
import { ToolBar } from '../../components/ToolBar';
import NumberField from '../../components/NumberField';
import { addPart, editArrangement, editPart, loadArragement, saveArrangement } from '../../actions/arrangement';
import { Card } from '../../components/Card';

const mapStateToProps = state => {
    return {
        arrangement: state.arrangement.arrangement,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPart: (part) => dispatch(addPart(part)),
        loadArragement: (id) => dispatch(loadArragement(id)),
        editArrangement: (change) => dispatch(editArrangement(change)),
        saveArrangement: () => dispatch(saveArrangement()),
        editPart: (change) => dispatch(editPart(change))
    }
}
const EditArrangentPage = ({
    editArrangement,
    arrangement,
    saveArrangement,
    loadArragement,
    addPart,
    editPart
}) => {

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const load = async () => {
        await loadArragement(params.serialNo);
    };


    const save = async () => {
        setLoading(true);
        await saveArrangement();
        setLoading(false);
    }

    const onNewPart = async () => { 
        await addPart({
            instrument: 1,
            no: 1
        });
    }

    if(loading) {
        return <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{"Arrangemang"}</div>
            {"Laddar..."}
        </div>
    }

    return (
        <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{"Skapa användare"}</div>
            <Card padding={true}>
                <Label label="Förnamn">
                    <TextField source={arrangement} property="title" onEdit={editArrangement}/>
                </Label>
                <Label label="Efternamn">
                    <TextField source={arrangement} property="title" onEdit={editArrangement}/>
                </Label>
                <Label label="Email">
                    <TextField source={arrangement} property="composer" onEdit={editArrangement}/>
                </Label>
                <Label label="Intrument">
                    <TextField source={arrangement} property="arranger" onEdit={editArrangement}/>
                </Label>
                <Label label="Lösenord">
                    <TextField source={arrangement} property="arranger" onEdit={editArrangement}/>
                </Label>
                <Label label="Bekräfta lösenord">
                    <TextField source={arrangement} property="arranger" onEdit={editArrangement}/>
                </Label>
            </Card>    
        </div>
     );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArrangentPage)