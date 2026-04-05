import '../../style/button.scss';

import React, { useEffect, useState } from 'react';
import { Table } from '../../components/Table';
import { useParams } from 'react-router-dom';
import { ToolBar } from '../../components/ToolBar';
import { Card } from '../../components/Card';
import { Row } from '../../components/Row';
import { PageHeader } from '../../components/PageHeader';
import Label from '../../components/Label';
import TextField from '../../components/TextField';
import { claimOptions } from '../../actions/role';
import SelectField from '../../components/SelectField';

export const EditRolePage = ({
    addClaim,
    editClaim,
    editRole,
    inheiritedClaims,
    loadInheiritedClaims,
    loadRole,
    loadRoles,
    role,
    roleOptions,
    saveRole
}) => {

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const onLoad = async () => {
        setLoading(true);
        await loadRole(params.id);
        await loadRoles();
        await loadInheiritedClaims(params.id);
        setLoading(false);
    };

    const onSave = async () => {
        await saveRole();
    }

    useEffect(() => {
        onLoad();
    }, []);

    if(!role || loading) {
        return (<div>
            <PageHeader header={"Roll"}/>
            {"Laddar..."}
        </div>);
    }

    const claims = [...inheiritedClaims.map(x => ({...x, isInheirited: true})), ...role.claims];

    console.log(claims);

    return (
        <div>
            <PageHeader header={"Roll"}/>
            <ToolBar onSave={onSave} loading={loading} saveDisabled={!role.dirty}/>
            <Row>
                <Card padding={true}>
                    <Label label="Namn">
                        <TextField source={role} property={"name"} onEdit={editRole} disabled={true}/>
                    </Label>
                    <Label label="Basroll">
                        <SelectField source={role} property={"parentId"} options={roleOptions.filter(x => x.value !== role.id)} onEdit={editRole} nulloption={true}/>
                    </Label>
                </Card>
            </Row>
            <Row>
                <Card header={"Behörigheter"}>
                    <Table 
                        colums={[{
                            header: "Behörighet",
                            property: "claim",
                            dataType: "select",
                            options: claimOptions,
                            edit: true
                        }]}
                        onNewRow={addClaim}
                        rows={claims}
                        onEditRow={editClaim}
                        isDisabled={(row) => row.isInheirited}
                    />
                </Card>   
            </Row>
        </div>
     );
};