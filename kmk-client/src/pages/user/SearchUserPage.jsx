import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect, useState } from 'react';

import TextField from '../../components/TextField';
import { Role, roleToString } from '../../actions/user';
import { getInstrumentName } from '../../actions/instrument,';

const User = ({user}) => {
    
    return (
        <div style={{padding: 10}}>
            <div style={{fontSize: ".9375rem", fontWeight: 600, color: "#050505"}}>{user.firstName} {user.lastName}</div>
            <div className='row'>
                {user.roles.filter(x => x.role !== Role.Admin).map(x => <div style={{
                    margin: 2, 
                    padding: 4,
                    fontSize: "small",
                    backgroundColor: "#ebf5ff", 
                    color: "#0866ff",
                    borderRadius: 5
                }}>
                    {roleToString(x.role)}
                </div>)}
            </div>
            <div style={{fontSize: "small", color: "#65676b"}}>{getInstrumentName(user.instrument)}</div>
        </div>
    );
}


export const SearchUserPage = ({
    header,
    loadUsers,
    users, 
}) => {

    const [filter, setFilter] = useState("");

    
    useEffect(() => {
        loadUsers(filter);
    }, []);

    const onEditFilter = (change) => {
        setFilter(change["filter"]);
        loadUsers(change["filter"]);
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
            <div style={{fontWeight: "bold", fontSize: "larger"}}>{header}</div>
            <div style={{paddingTop: 10}}>
                <TextField source={filter} property="filter" onEdit={onEditFilter} placeholder="Sök"/>
            </div>
                {users.map(user => <User user={user}/>)}
            </div>
        </div>
     );
};