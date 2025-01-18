import React, { useContext, useEffect, useState } from 'react';
import { roomDivClickContext } from '../Context/ContextApi';
import { fetchJoinedRoomApi, joinRoomApi } from '../services/allApis';
import toast from 'react-hot-toast';
import ChatContainer from './ChatContainer';

function MessageContainer() {

  const { divClickResponse } = useContext(roomDivClickContext);
  const [JoinRoom, setJoinRoom] = useState({});


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await fetchJoinedRoomApi(header)
    console.log(res);

    if (res.status == 200) {
      const rooms = {};
      res.data.rooms.forEach(room => {
        rooms[room._id] = true;
      });
      setJoinRoom(rooms);
    } else {
      console.log(res);
    }
  }

  const handleJoinRoom = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const id = divClickResponse.roomId
    const res = await joinRoomApi(id, header)

    if (res.status == 200) {
      toast.success("Successfully join the room!")
      setJoinRoom(prev => ({
        ...prev,
        [divClickResponse.roomId]: true
      }));
    } else {
      toast.error("Failed to join the room!")
    }
  };

  return (
    <>
      {
        divClickResponse.div ?
          JoinRoom[divClickResponse.roomId] ?
            <div>
              <div style={{ height: '7vh', background: 'gray' }} className='d-flex align-items-center ps-2'>
                <h2>Welcome to the Room: {divClickResponse.name}</h2>
              </div>

              <ChatContainer />
            </div>
            :
            <div>
              <h1>{divClickResponse.name}</h1>
              {
                Array.isArray(divClickResponse.participants) && divClickResponse.participants.length > 0 ?
                  divClickResponse.participants.map(item => (
                    <h2>{item.username}</h2>
                  ))
                  :
                  <h1>No participants</h1>
              }
              <button className="btn btn-primary" onClick={handleJoinRoom}>Join Room </button>
            </div>
          :
          <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
            <h2 className="fw-bold">Create a Room or Join</h2>
          </div>
      }
    </>
  );
}

export default MessageContainer;
