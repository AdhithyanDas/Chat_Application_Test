import React, { createContext, useState } from 'react'

export const createChatRoomContext = createContext()
export const updateChatRoomContext = createContext()
export const roomDivClickContext = createContext()
export const fetchMessageContext = createContext()

function ContextApi({ children }) {

    const [createResponse, setCreateResponse] = useState("")
    const [updateResponse, setUpdateResponse] = useState("")
    const [divClickResponse, setDivClickResponse] = useState({
        div: false, name: "", participants: "", roomId: ""
    })
    const [messageResponse, setMessageResponse] = useState([])

    return (
        <>
            <createChatRoomContext.Provider value={{ createResponse, setCreateResponse }}>
                <updateChatRoomContext.Provider value={{ updateResponse, setUpdateResponse }}>
                    <roomDivClickContext.Provider value={{ divClickResponse, setDivClickResponse }}>
                        <fetchMessageContext.Provider value={{ messageResponse, setMessageResponse }}>
                            {children}
                        </fetchMessageContext.Provider>
                    </roomDivClickContext.Provider>
                </updateChatRoomContext.Provider>
            </createChatRoomContext.Provider>
        </>
    )
}

export default ContextApi