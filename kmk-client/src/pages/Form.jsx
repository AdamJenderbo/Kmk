import Label from "../components/Label";
import NumberField from "../components/NumberField";
import SelectField from "../components/SelectField";
import TextField from "../components/TextField";

const Field = ({item, source, onEdit}) => {

    const {dataType, property, disabled} = item;

    if(dataType === "text") {
        return <TextField source={source} onEdit={onEdit} property={property} disabled={disabled}/>;
    }
    
    if(dataType === "number") {
        return <NumberField source={source} onEdit={onEdit} property={property} disabled={disabled}/>;
    }
    
    // if(dataType === "date") {
    //     return <DateField source={source} onEdit={onEdit} property={property} disabled={disabled}/>;
    // } 
    
    if(dataType === "select") {
        return <SelectField source={source} onEdit={onEdit} property={property} options={item.options} disabled={disabled}/>;
    }
}

export const Form = ({children}) => {    

    return (
        <div>
            {children.map((child) => (
                <Label>
                    {child}
                </Label>
            ))}
        </div>
     );
};