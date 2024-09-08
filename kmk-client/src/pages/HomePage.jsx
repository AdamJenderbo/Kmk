import '../style/home.scss';

import React from 'react';

export const HomePage = () => {

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
                <div style={{fontSize: "x-large", marginTop: 100, textAlign: "center"}}>
                    Välkommen till Kungälvs musikkårs notarkiv!
                </div>
            </div>
        </div>
    );
}
