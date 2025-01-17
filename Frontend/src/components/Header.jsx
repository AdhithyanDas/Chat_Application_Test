import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {

    const isLoggedIn = sessionStorage.getItem('username')

    const handleLogout = () => {
        sessionStorage.clear()
        nav('/')
    }

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
                                <button onClick={handleLogout} className='btn btn-dark'>
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