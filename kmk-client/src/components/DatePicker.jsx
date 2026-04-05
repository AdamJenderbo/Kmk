import React from 'react';
import '../style/textField.scss';
import '../style/layout.scss';
import { getNoOfDaysInMonth, getWeekDayOfDate, monthOptions } from '../actions/event';
import SelectField from './SelectField';
import TextField from './TextField';

export default class DatePicker extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            date: {
                year: 2023,
                month: 9,
                day: 11
            }
        }

        this.onEdit = (change) => {
            const newDate = {...this.state.date, ...change}

            this.setState({
                date: newDate
            });

            this.props.onEdit({date: new Date(newDate.year, newDate.month, newDate.day)});
        }

        this.createWeeks = () => {
            const firstWeekDayInMonth = getWeekDayOfDate(this.state.year, this.state.month, 1);
            const weeks = [];

            for (let i = 1; i < firstWeekDayInMonth; i++) {
                weeks.push({day: 0})
            }

        }

        this.getDayOptions = (month) => {
            const noOfDays = getNoOfDaysInMonth(month);
            const days = [];
            for (let i = 1; i <= noOfDays; i++) {
                days.push({value: i, text: `${i}`});
            }
            return days;
        };

    }

    render() {
        const { date, date: {month} } = this.state;

        return (
            <div>
                {/* <input className={className} type="text" value={`${day} ${getNameOfMonth(month)} ${year}`} onChange={this.onChange}/> */}
                <div className='row'>
                    <div className='col-3'>
                        <TextField source={date} property={"year"} onEdit={this.onEdit}/>
                    </div>
                    <div className='col-6'>
                        <SelectField source={date} property={"month"} options={monthOptions} onEdit={this.onEdit}/>
                    </div>
                    <div className='col-3'>
                        <SelectField source={date} property={"day"} options={this.getDayOptions(month)} onEdit={this.onEdit}/>
                    </div>
                </div>

                {/* <div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>{"<-"}</div>
                        <div>{`${getNameOfMonth(this.state.month)} ${this.state.year}`}</div>
                        <div>{"->"}</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div>Mån</div>
                        <div>Tis</div>
                        <div>Ons</div>
                        <div>Tor</div>
                        <div>Fre</div>
                        <div>Lör</div>
                        <div>Sön</div>
                    </div>
                </div> */}
            </div>
         );
    }
}
