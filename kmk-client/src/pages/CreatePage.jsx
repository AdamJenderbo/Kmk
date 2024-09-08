import '../style/button.scss';

import React from 'react';
import { Card } from '../components/Card';
import { Form } from './Form';
import Button from '../components/Button';

export const CreatePage = ({
    addRow,
    create,
    def,
    edit,
    header,
    source
}) => {

    const onNewRow = async () => { 
        await addRow({
        });
    }

    return (
        <div>
            <div style={{fontWeight: "bold", fontSize: "larger", padding: 5}}>{header}</div>
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

                    return <div>{"Unknown element"}</div>
                })}    
            </div>
            <div style={{padding: 5}}>
                <Button onClick={create} shape={"rounded"}>Skapa</Button>
            </div>

        </div>
     );
};