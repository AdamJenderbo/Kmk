import Button from "../Button";
import Label from "../Label";
import NumberField from "../NumberField";
import TextField from "../TextField";

export const CreateArrangement = ({source, edit, create}) => {

    const valid = source.title.length > 0 && source.composer.length > 0 && source.arranger;

    return (
        <div>
            <Label label="Löpnummer">
                <NumberField source={source} property="serialNumber" onEdit={edit}/>
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
            <Button onClick={create} disabled={!valid} shape="rounded">
                Skapa
            </Button>
        </div>
    );
}