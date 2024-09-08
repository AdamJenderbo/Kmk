import '../../style/card.scss';
import '../../style/button.scss';
import '../../style/app.scss';

import React, { useEffect } from 'react';
import Button from '../../components/Button';
import { getInstrumentName } from '../../actions/instrument,';

const User = ({onClickAppove, user}) => {   

    return (
        <div className='row' style={{padding: 10, justifyContent: "space-between", width: "50%"}}>
            <div>
                <div style={{fontWeight: 600, fontSize: "0.9375rem"}}>{user.firstName} {user.lastName}</div>
                <div style={{fontSize: "small"}}>{getInstrumentName(user.instrument)}</div>
            </div>
            <Button style={{margin: 10}} shape="rounded" color="green" onClick={() => onClickAppove(user.id)}>Godkänn</Button>
        </div>)
}


export const UnapprovedUsersPage = ({
    approveUser,
    loadMembershipRequests, 
    unapprovedUsers
}) => {

    const onClickApprove = async (user) => {
        await approveUser(user);
        loadMembershipRequests();
    }

    useEffect(() => {
        loadMembershipRequests();
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>      
                <div style={{fontWeight: "bold", fontSize: "larger"}}>Medlemsansökningar</div>
                {unapprovedUsers.map(user => <User user={user} onClickAppove={onClickApprove}/>)}
                {unapprovedUsers.length === 0 && <div style={{padding: 10}}>Finns inga ansökningar</div>}
            </div>
        </div>
     );
};