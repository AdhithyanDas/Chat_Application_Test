import React, { useContext } from 'react';
import { roomDivClickContext } from '../Context/ContextApi';

function MessageContainer() {

  const { divClickResponse } = useContext(roomDivClickContext);

  return (
    <>
      {
        divClickResponse.div ?
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
            <button className="btn btn-primary">Join Room</button>
          </div>
          :
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '75vh' }}
          >
            <h2 className="fw-bold">Create a Room or Join</h2>
          </div>
      }
    </>
  );
}

export default MessageContainer;
