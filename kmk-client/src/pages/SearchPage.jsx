import '../style/card.scss';
import '../style/button.scss';
import '../style/app.scss';

import React, { useEffect, useState } from 'react';

import { Table } from '../components/Table';
import TextField from '../components/TextField';
import { ArrangementSorting } from '../actions/arrangement';
import { useNavigate } from 'react-router-dom';
import { Role } from '../actions/user';

export const SearchPage = ({
    colums, 
    header,
    loadRows,
    rows, 
    user
}) => {

    const [filter, setFilter] = useState({filter: ""});
    const [sorting, setSorting] = useState(ArrangementSorting.SerialNumber)
    const [sortingColum, setSortingColum] = useState(undefined);

    const navigate = useNavigate();

    const onClickRow = async (row) => {

        if(user.roles.includes(Role.Arrangement)) {
            navigate(`/noter/${row.serialNumber}`);
        }
    }

    const onClickHeader = (colum) => {

        let tempSorting = sorting;

        if(colum.property === "serialNumber") {
            tempSorting = ArrangementSorting.SerialNumber;
        } else if(colum.property === "title") {
            tempSorting = ArrangementSorting.Title;
        } else if(colum.property === "composer") {
            tempSorting = ArrangementSorting.Composer;
        } else if (colum.property === "arranger") {
            tempSorting = ArrangementSorting.Arranger;
        }

        setSorting(tempSorting);
        setSortingColum(colum);
        loadRows(filter, tempSorting);
    }
    
    useEffect(() => {
        loadRows(filter, sorting);
    }, []);

    const onEditFilter = (change) => {
        setFilter(change);
        loadRows(change, sorting);
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{fontWeight: "bold", fontSize: "larger"}}>{header}</div>
                <div style={{paddingTop: 10}}>
                    <TextField 
                        source={filter} 
                        property="filter" 
                        onEdit={onEditFilter} 
                        placeholder="Sök"
                    />
                </div> 
                <Table 
                    colums={colums} 
                    rows={rows} 
                    onClickRow={onClickRow}
                    onClickHeader={onClickHeader}
                    sortBy={sortingColum}
                />      
            </div>
        </div>
    );
};