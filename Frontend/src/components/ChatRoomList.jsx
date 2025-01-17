import React, { useEffect, useState } from 'react'
import { fetchRoomsApi } from '../services/allApis'
import toast from 'react-hot-toast'

function ChatRoomList() {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await fetchRoomsApi(header)
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }
    }

    return (
        <>

        </>
    )
}

export default ChatRoomList