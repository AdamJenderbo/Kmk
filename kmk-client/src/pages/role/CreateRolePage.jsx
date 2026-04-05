import '../../style/button.scss';

import React from 'react';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { Row } from '../../components/Row';
import Label from '../../components/Label';
import TextField from '../../components/TextField';

export const CreateRolePage = ({
    createRole,
    editRole,
    role
}) => {

    return (
        <div>
            <PageHeader header="Skapa roll"/>
            <Row>
                <Card padding={true}>
                    <Label label="Namn">
                        <TextField source={role} property={"name"} onEdit={editRole}/>
                    </Label>
                </Card>
            </Row>
            <div style={{padding: 5}}>
                <Button onClick={createRole} shape={"rounded"}>Skapa</Button>
            </div>
        </div>
     );
};