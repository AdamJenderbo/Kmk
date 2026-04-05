import '../style/user.scss';
import '../style/card.scss';

import React from 'react';

export default function Page({children}) {

    return (
        <div style={{position: "relative", top: 50}}>
            {/* <div style={{width: "60%"}}> */}
                {children}
            {/* </div> */}
        </div>
    );
}