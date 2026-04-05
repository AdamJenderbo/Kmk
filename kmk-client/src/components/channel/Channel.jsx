import { useState } from "react";
import Button from "../Button";
import TextField from "../TextField";
import { getDate, getTime } from "../../actions/date";
import '../../style/chat.scss';
import { getNameOfMonth } from "../../actions/event";

const Message = ({message, prevMessage}) => {
    return (
        <div className="message">
                {((prevMessage && message.user.id !== prevMessage.user.id) || !prevMessage) && <div style={{display: "flex"}}>
                    <div style={{fontWeight: "bold", padding: 2}}>{`${message.user.firstName} ${message.user.lastName}`}</div>
                    <div style={{fontSize: "small"}}>{getTime(message.created)}</div>
                </div>}
                <div style={{padding: 2}}>{message.text || message.message}</div>
        </div>
    );
}

const Day = ({date, messages}) => {

    const today = getDate(new Date().toISOString());
    
    var yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);   
    const yesterday = getDate(yesterdayDate.toISOString());

    const dateToText = (date) => {
        const year = date.substring(0, 4);
        const month = parseInt(date.substring(5, 7));
        const day = parseInt(date.substring(8, 10));
        console.log(month);
        return `${day} ${getNameOfMonth(month - 1)} ${year}`;
    }

    const dateText = today === date ? "Idag" : yesterday === date ? "Igår" : dateToText(date);

    return (
        <div>
            <div style={{
                display: "flex", 
                justifyContent: "center", 
                //borderTop: "thin solid rgb(112, 112, 112)"
            }}>
                <div style={{
                    padding: 2,
                    fontWeight: "bold", 
                    textAlign: "center",  
                    borderRadius: 10,
                    color: "rgb(112, 112, 112)",
                    fontSize: "small",
                    alignItems: "center"
                }}>
                    {dateText}
                </div>
            </div>
            {messages.map((message, index) => <Message 
                key={index} 
                message={message} 
                prevMessage={index === 0 ? undefined : messages[index - 1]}
            />)}
        </div>
    )
}
    
const MessageList = ({messages}) => {

    const days = Object.groupBy(messages, ({created}) => getDate(created))
    const arr = Object.keys(days).map((key) => ({date: key, messages: days[key]}));

    return (
        <div style={{height: "94%", overflow: "auto"}}>
            {arr.map((day, index) => <Day 
                key={index} 
                date={day.date} 
                messages={day.messages}
            />)}
        </div>
    );
}

const MessageInput = ({onSend}) => {

    const [message, setMessage] = useState("");

    const onClickSend = () => {
        onSend(message);
        setMessage("");
    }

    return (<div style={{display: "flex", padding: 10}}>
        <TextField 
            source={{message}} 
            property="message" 
            onEdit={(change) => setMessage(change.message)}
        />
        <Button 
            disabled={!message || message.length === 0} 
            onClick={onClickSend}
        >
            Skicka
        </Button>
    </div>
   );
}

export const Channel = ({sendMessage, messages}) => {

    const onSend = async (message) => {
        await sendMessage(message);
    }

    return (
        <div style={{height: "100%"}}>
            <MessageList messages={messages}/>
            <MessageInput onSend={onSend}/>
        </div>
    );
}