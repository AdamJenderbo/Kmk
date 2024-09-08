import { Channel } from '../../components/channel/Channel';
import '../../style/home.scss';
import * as signalR from "@microsoft/signalr";

import React, { useEffect, useState } from 'react';


const ChannelItem = ({channel, activeChannel, onClick}) => {

    const active = channel.id === activeChannel.id;

    return (
        <div 
            style={{
                padding: 10,
                margin: 10,
                backgroundColor: active ? "rgb(240, 242, 245)" : "white",
                borderRadius: active ? 15 : 0,
                cursor: "pointer"
            }}
            onClick={() => onClick(channel)}
        >
            {channel.name}
        </div>
    );
}

const ChannelList = ({channels, activeChannel, onClickChannel}) => {
    return (     
        <div style={{backgroundColor: "white", width: "18%", borderRight: "1px solid #f1f1f1"}}>
            <div style={{textAlign: "center", padding: 20, fontWeight: "bold"}}>Kanaler</div>
            {channels.map((channel, index) => <ChannelItem
                key={index} 
                channel={channel} 
                activeChannel={activeChannel}
                onClick={onClickChannel}
            />)}
        </div>
    )
}

export const ChatPage = ({
    addMessage,
    channel, 
    channels,
    loadChannels, 
    loadChannel, 
    messages,
    setMessages,
    user
}) => {


    const load = async () => {
        const channels = await loadChannels();

        if(channels && channels.length > 0) {
            const channel = await loadChannel(channels[0].id);
            setMessages(channel.posts);
            // await loadMessages(channels[0].id);
        }

    } 

    useEffect(() => {
        load();
    }, []);


    const [connection, setConnection] = useState(null);
  
    useEffect(() => {
        // Initialize the SignalR connection
        const connect = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5072/channel-hub") // Ensure this is the correct URL for your SignalR hub
            .withAutomaticReconnect() // Automatically reconnect on connection loss
            .build();
  
        // Start the connection
        connect.start().then(() => {
            console.log("Connected to SignalR Hub");
  
            // Handle incoming messages
            connect.on("ReceiveMessage", (message) => {
                console.log("Message received:", message);
                addMessage(message);
                // setMessages((prevMessages) => [...prevMessages, message]);
            });

        }).catch((err) => console.error("SignalR Connection Error: ", err));
  
        // Set the connection state
        setConnection(connect);
    
        // Clean up the connection when component unmounts
        return () => {
            connect.stop();
        };
    }, []);
  
    // Function to send a message to the hub
    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.invoke("SendMessage", {
                    channelId: channel.id,
                    userId: user.id, 
                    text: message
                });
                console.log("Message sent:", message);
            } catch (err) {
                console.error("Send Message Error: ", err);
            }
        }
    };

    const changeChannel = async (channel) => {
        const loadedChannel = await loadChannel(channel.id);
        setMessages(loadedChannel.posts);
    }

    console.log(channel)

    return (
        <div style={{display: "flex", height: 880}}>
            <ChannelList 
                channels={channels} 
                activeChannel={channel}
                onClickChannel={changeChannel}
            />
            <div style={{width: "70%"}}>
                <Channel 
                    channel={channel} 
                    user={user} 
                    sendMessage={(message) => sendMessage(message)}
                    messages={messages}
                />
            </div>
            <div style={{backgroundColor: "white", width: "10%", borderLeft: "1px solid #f1f1f1"}}>
                {channel.members &&<div style={{display: "block"}}>
                    <div style={{textAlign: "center", fontWeight: "bold", padding: 10, width: "100%"}}>Medlemmar</div>
                    {channel.members.map(x => (<div style={{padding: 5}}>{x.firstName}</div>))}
                </div>}
            </div>
        </div>
    );
}
