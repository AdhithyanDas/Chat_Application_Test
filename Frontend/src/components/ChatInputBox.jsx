import React, { useContext, useEffect, useState } from 'react'
import { fetchMessageContext, roomDivClickContext } from '../Context/ContextApi';
import toast from 'react-hot-toast';
import { sendMessageApi } from '../services/allApis';
import { socketContext } from '../Context/SocketContext';

function ChatInputBox() {

    const { socket } = useContext(socketContext);
    const { divClickResponse } = useContext(roomDivClickContext);
    const { setMessageResponse } = useContext(fetchMessageContext)

    const [message, setMessage] = useState({
        content: "", roomId: divClickResponse.roomId, senderId: sessionStorage.getItem('userId')
    })

    useEffect(() => {
        setMessage((prev) => ({
            ...prev, roomId: divClickResponse.roomId
        }))
    }, [divClickResponse.roomId])

    const handleSendMessage = async () => {
        const { content, roomId, senderId } = message
        if (!content || !roomId || !senderId) {
            toast.error("Enter message!")
        } else {
            socket.emit('sendMessage', { content, roomId, senderId });
            const header = {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
            const res = await sendMessageApi(roomId, header, message)
            console.log(res);

            if (res.status == 200) {
                setMessageResponse(res.data)
                setMessage((prev) => ({ ...prev, content: "" }))
            }
        }
    }

    return (
        <>
            <div style={{ background: 'gray', height: "8vh" }} className='d-flex align-items-center ps-2'>
                <input onChange={e => setMessage({ ...message, content: e.target.value })} value={message.content} type="text" style={{ height: '7vh', width: '90%', background: 'white' }} />
                <button onClick={handleSendMessage} className='btn btn-primary ms-3'>Send</button>
            </div>
        </>
    )
}

export default ChatInputBox