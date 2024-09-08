import React from 'react';
import '../style/label.scss';
import '../style/table.scss';
import Button from './Button';
import SelectField from './SelectField';
import { Link } from 'react-router-dom';
import NumberField from './NumberField';
import Icon from './Icon';
import { Icons } from '../actions/icon';
import { DateField } from './fields/DateField';

const Toolbar = ({onNewRow, loading}) => {

    return <div className='table-toolbar'>
        {onNewRow && <Button
            className={"save"} 
            onClick={onNewRow} 
            color="green" 
            width={60} 
            height={25}
            loading={loading}
            shape="rounded"
            >
                Lägg till
            </Button>
        }
    </div>   
}

const Header = ({colum, onClick, sortBy}) => {
    return (<th className='text' onClick={() => onClick(colum)}>
        <div style={{display:"flex"}}>
            {colum.header}
            {sortBy && colum.property === sortBy.property && <Icon type={Icons.ArrowDown} style={{marginLeft: 4}}/>}
        </div>
    </th>);
}

const TextCell = ({colum, row}) => {

    const {property} = colum;

    const value = row[property];

    if(colum.link) {
        return (<td className='table-link last' style={{width: colum.width}}>
            <Link to={colum.link(row)}>
                <div className='table-link-text'>{value}</div>
            </Link>
        </td>);
    }

    return <td className='last' style={{width: colum.width}}>{value}</td>;
}


const NumberCell = ({colum, row, onEdit}) => {

    const {edit, property} = colum;

    const value = row[property];

    if(edit) {
        return <NumberField source={row} property={property} onEdit={onEdit}/>
    }

    return <td className='last' style={{width: colum.width}}>{value}</td>;
}

const DateCell = ({colum, row, onEdit, loading}) => {

    const {edit, property} = colum;

    const value = row[property];

    if(edit) {
        return (<td className='last' style={{width: colum.width}}>
            <DateField 
                source={row} 
                property={colum.property} 
                onEdit={onEdit}
                disabled={loading}
            />
        </td>);
    } else {
        return <td className='last date' style={{width: colum.width}}>{`${value.year}-${value.month}-${value.day}`}</td>;
    }
}

const SelectCell = ({colum, row, onEdit, loading, disabled}) => {

    const {edit, options, property, width} = colum;

    const value = row[property];

    if(edit) {

        return <td className='select' style={{width}}>
            <SelectField
                source={row} 
                property={property} 
                onEdit={onEdit} 
                options={options}
                disabled={loading || disabled}
            />
        </td>


    } else {               
        const option = options.find(x => x.value === value);


        return <td style={{width: colum.width}}>
            {option ? option.text : "NULL"}
        </td>
    }
}


const Cell = ({colum, row, onEdit, loading, disabled}) => {

    const { dataType } = colum;

    if(dataType === "text") {
        return <TextCell colum={colum} row={row} disabled={disabled}/>
    } else if(dataType === "number") {
        return <NumberCell colum row onEdit disabled/>
    }else if(dataType === "date") {
        return <DateCell colum={colum} row={row} onEdit={onEdit} loading={loading} disabled/>
    } else if(dataType === "select") {
        return <SelectCell colum={colum} row={row} onEdit={onEdit} loading={loading} disabled={disabled}/>
    }

}

const Row = ({colums, row, onClick, onEdit, loading, isDisabled, onClickRemoveRow}) => {

    const onEditCell = (change) => {
        onEdit({row, change})
    }

    const disabled = isDisabled && isDisabled(row);

    return (
    <tr onClick={onClick ? () => onClick(row) : undefined}>
        {colums.map((colum, index) => (
            <Cell 
                key={index} 
                row={row} 
                colum={colum} 
                onEdit={onEditCell}
                loading={loading}
                disabled={disabled}
            />))}
        {/* <div onClick={() => onClickRemoveRow(row)}>x</div> */}
    </tr>);
}

export const Table = ({
    colums, 
    rows, 
    onClickRow, 
    onNewRow, 
    onEditRow, 
    loading, 
    isDisabled, 
    onClickRemoveRow, 
    onClickHeader, 
    sortBy
}) =>
{
    return (
        <div className='table'>
            <Toolbar loading={loading}/>
            <table>
                <thead>
                    {colums.map((colum, index) => <Header 
                        key={index} 
                        colum={colum}
                        onClick={onClickHeader}
                        sortBy={sortBy}
                    />)}
                </thead>

                <tbody>
                    {rows.map((row, index) => <Row 
                        key={index} 
                        colums={colums} 
                        row={row}
                        onClick={onClickRow}
                        onEdit={onEditRow}
                        loading={loading}
                        isDisabled={isDisabled}
                        onClickRemoveRow={onClickRemoveRow}
                    />)}
                </tbody>
            </table>
            {onNewRow && <div className='newButton' onClick={onNewRow}>+ Lägg till</div>}
        </div>
    );
}