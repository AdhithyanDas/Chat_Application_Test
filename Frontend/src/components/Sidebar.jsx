import React from 'react'
import CreateChatRoom from './CreateChatRoom'
import ChatRoomList from './ChatRoomList'

function Sidebar() {
    return (
        <>
            <CreateChatRoom />
            <ChatRoomList />
        </>
    )
}

export default Sidebar