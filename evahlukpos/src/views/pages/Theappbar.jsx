import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../views/pages/logo.jpg.png'

const MyAppBar = () => {
    const [currentPage, setCurrentPage] = useState('/')

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <AppBar position="static" style={{ backgroundColor: 'green' }}>
            <Toolbar>
                <Box
                    sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
                >
                    <img
                        src={logo}
                        alt="Company Logo"
                        style={{
                            maxWidth: '5%',
                            maxHeight: '5%',
                            marginRight: '10px',
                        }}
                    />
                </Box>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    onClick={() => handlePageChange('/')}
                    style={{
                        backgroundColor:
                            currentPage === '/' ? 'orange' : 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                    }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    onClick={() => handlePageChange('/register')}
                    style={{
                        backgroundColor:
                            currentPage === '/register' ? 'orange' : 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                    }}
                >
                    Register
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    onClick={() => handlePageChange('/login')}
                    style={{
                        backgroundColor:
                            currentPage === '/login' ? 'orange' : 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                    }}
                >
                    Sign In
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/contact"
                    onClick={() => handlePageChange('/contact')}
                    style={{
                        backgroundColor:
                            currentPage === '/contact' ? 'orange' : 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                    }}
                >
                    Contact Us
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/about"
                    onClick={() => handlePageChange('/about')}
                    style={{
                        backgroundColor:
                            currentPage === '/about' ? 'orange' : 'inherit',
                        textTransform: 'none',
                        textDecoration: 'underline',
                    }}
                >
                    About Us
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default MyAppBar
