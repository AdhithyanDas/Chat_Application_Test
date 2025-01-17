import React, { createContext, useState } from 'react'

export const createChatRoomContext = createContext()
export const updateChatRoomContext = createContext()
export const roomDivClickContext = createContext()

function ContextApi({ children }) {

    const [createResponse, setCreateResponse] = useState("")
    const [updateResponse, setUpdateResponse] = useState("")
    const [divClickResponse, setDivClickResponse] = useState({
        div: false, name: "", participants: ""
    })

    return (
        <>
            <createChatRoomContext.Provider value={{ createResponse, setCreateResponse }}>
                <updateChatRoomContext.Provider value={{ updateResponse, setUpdateResponse }}>
                    <roomDivClickContext.Provider value={{ divClickResponse, setDivClickResponse }}>
                        {children}
                    </roomDivClickContext.Provider>
                </updateChatRoomContext.Provider>
            </createChatRoomContext.Provider>
        </>
    )
}

export default ContextApi