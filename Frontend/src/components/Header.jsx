import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { socketContext } from '../Context/SocketContext';
import toast from 'react-hot-toast';

function Header() {

    const isLoggedIn = sessionStorage.getItem('username')
    const { handleLogout } = useContext(socketContext)

    const handleLogoutt = () => {
        handleLogout()
        toast.success("You have successfully logged out!")
        nav('/'); // Navigate to login
    };
    const nav = useNavigate()

    return (
        <>
            <Navbar className="bg-primary border-0">
                <Container>
                    <Navbar.Brand className='text-white fw-bold d-flex align-items-center'>
                        <MessageCircle />
                        {' '}
                        <span className='ms-1'>TalkHub</span>
                    </Navbar.Brand>

                    <div className='ms-auto'>
                        {
                            isLoggedIn &&
                            <>
                                <button onClick={handleLogoutt} className='btn btn-dark'>
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header