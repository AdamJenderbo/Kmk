import React from 'react';
import { Table } from './Table';

export const ArrangementTable = ({arrangements}) => {
{
        const colums = [{
            header: "Löpnummer",
            property: "serialNumber"
        }, {
            header: "Titel",
            property: "title"
        }, {
            header: "Kompositör",
            property: "composer"
        }, {
            header: "Arrangör",
            property: "arranger"
        }];

        return (
            <Table colums={colums} rows={arrangements}></Table>
         );
    }
}