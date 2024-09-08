import '../style/button.scss';

import React, { useEffect, useState } from 'react';
import { Table } from '../components/Table';
import { useParams } from 'react-router-dom';
import { ToolBar } from '../components/ToolBar';
import { Card } from '../components/Card';
import { Form } from './Form';

export const EditPage = ({
    header,
    def,
    source,
    load,
    save,
    edit,
    addRow,
    editRow
}) => {

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const onLoad = async () => {
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

    const onNewRow = async () => { 
        await addRow({
        });
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
        <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
            <ToolBar onSave={onSave} loading={loading} saveDisabled={!source.dirty}/>
            <div className='row'>
                {def.elements.map(item => {

                    if(item.type === "form") {
                        return (
                            <Card padding={true}>
                                <Form 
                                    def={item.def}
                                    source={source} 
                                    onEdit={edit} 
                                />
                            </Card>
                        );
                    }

                    if(item.type === "table") {
                        return (
                            <Card header={item.header}>
                                <Table 
                                    colums={item.def}
                                    onNewRow={onNewRow} 
                                    rows={source[item.property]}
                                    onEditRow={(change) => editRow(item.property, change)}
                                />
                            </Card>
                        );
                    }

                    return <div>{"Unknown element"}</div>
                })}    
            </div>
        </div>
     );
};