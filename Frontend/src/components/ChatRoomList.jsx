import React, { useContext, useEffect, useState } from 'react'
import { deleteRoomApi, fetchRoomsApi } from '../services/allApis'
import { createChatRoomContext, roomDivClickContext, updateChatRoomContext } from '../Context/ContextApi'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import UpdateChatRoom from './UpdateChatRoom'

function ChatRoomList() {

    const [data, setData] = useState([])

    const { createResponse } = useContext(createChatRoomContext)
    const { updateResponse } = useContext(updateChatRoomContext)
    const { setDivClickResponse } = useContext(roomDivClickContext)

    useEffect(() => {
        getData()
    }, [createResponse, updateResponse])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await fetchRoomsApi(header)
        console.log(res);

        if (res.status == 200) {
            setData(res.data.rooms)
        } else {
            console.log(res);
        }
    }

    const handleDeleteRoom = async (id, e) => {
        e.stopPropagation();
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await deleteRoomApi(id, header)
        if (res.status == 200) {
            toast.success("Room deleted!")
            getData()
        } else {
            toast.error("Deletion failed!")
        }
    }

    const handleDivClick = (name, participants) => {
        setDivClickResponse({
            div: true,
            name,
            participants
        })
    }

    return (
        <>
            {
                data.length > 0 ?
                    <>
                        {
                            data?.map(item => (
                                <div onClick={() => handleDivClick(item.name, item.participants)} className='d-flex align-items-center ps-3' style={{ borderBottom: "1px solid black", height: "8vh", cursor: 'pointer' }}>
                                    <h3 className='fw-bold'>{item.name}</h3>
                                    <div className='ms-auto'>
                                        <UpdateChatRoom room={item} />
                                        <button onClick={(e) => handleDeleteRoom(item._id, e)} className='btn text-primary'><Trash /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <h1>hih</h1>
            }
        </>
    )
}

export default ChatRoomList