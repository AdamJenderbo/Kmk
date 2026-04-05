import '../style/card.scss';
import '../style/button.scss';
import '../style/layout.scss'
import '../style/calendar.scss'

import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../components/Card';
import { RegisterArrangement } from '../components/RegisterArrangement';
import { editArrangement, registerArrangement } from '../actions/arrangement';
import { ArrangementTable } from '../components/ArrangementTable';

const mapStateToProps = state => {
    return {
        arrangement: state.arrangement.arrangement,
        arrangements: state.arrangement.arrangements
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editArrangement: (change) => dispatch(editArrangement(change)),
        registerArrangement: () => dispatch(registerArrangement())
    }
}


const AdminPage = ({arrangement, arrangements, editArrangement, registerArrangement}) => {    

    console.log(arrangement);
    console.log(arrangement);

    return (
        <div className='page'>
            <Card>
                <RegisterArrangement 
                    arrangement={arrangement} 
                    editArrangement={editArrangement}
                    registerArrangement={registerArrangement}
                />
            </Card>
            <Card>
                <h3>Arrangemang</h3>
                <ArrangementTable arrangements={arrangements}/>
            </Card>

        </div>
     );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)