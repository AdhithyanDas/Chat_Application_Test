import React, { useContext, useEffect, useState } from 'react'
import { fetchMessageApi } from '../services/allApis';
import { fetchMessageContext, roomDivClickContext } from '../Context/ContextApi';
import { socketContext } from '../Context/SocketContext';

function ChatDisplay() {

    const { socket } = useContext(socketContext);
    const [message, setMessage] = useState([])
    const { divClickResponse } = useContext(roomDivClickContext);
    const { messageResponse } = useContext(fetchMessageContext)

    useEffect(() => {
        getData()
        socket.on('receiveMessage', (newMessage) => {
            setMessage(prev => [...prev, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [divClickResponse.roomId, messageResponse])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`,
        };
        const res = await fetchMessageApi(divClickResponse.roomId, header)
        console.log(res);
        if (res.status == 200) {
            setMessage(res.data.messages)
        }
    }

    return (
        <>
            {
                message.length > 0 ?
                    <>
                        {
                            message.map(item => (
                                <div className={`chat ${item.senderId._id === sessionStorage.getItem('userId') ? 'chat-end' : 'chat-start'}`}>
                                    <div className="chat-header">
                                        {item.senderId?.username || 'unkwon'}
                                        <span className="text-xs opacity-50">online</span>
                                    </div>
                                    <div className="chat-bubble">{item.content}</div>
                                    <div className="chat-footer opacity-50">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Invalid Date'}
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <h1>No messages</h1>
            }
        </>
    )
}

export default ChatDisplay