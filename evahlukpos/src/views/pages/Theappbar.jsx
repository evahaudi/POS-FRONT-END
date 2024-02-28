// import React, { useState } from 'react'
// import { AppBar, Toolbar, Box, Button } from '@mui/material'
// import { Link } from 'react-router-dom'
// import logo from '../../views/pages/logo.jpg.png'

// const MyAppBar = () => {
//     const [currentPage, setCurrentPage] = useState('/')

//     const handlePageChange = (page) => {
//         setCurrentPage(page)
//     }

//     return (
//         <AppBar position="static" style={{ backgroundColor: 'green' }}>
//             <Toolbar>
//                 <Box
//                     sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
//                 >
//                     <img
//                         src={logo}
//                         alt="Company Logo"
//                         style={{
//                             maxWidth: '5%',
//                             maxHeight: '5%',
//                             marginRight: '10px',
//                         }}
//                     />
//                 </Box>
//                 <Button
//                     color="inherit"
//                     component={Link}
//                     to="/"
//                     onClick={() => handlePageChange('/')}
//                     style={{
//                         backgroundColor:
//                             currentPage === '/' ? 'orange' : 'inherit',
//                         textTransform: 'none',
//                         textDecoration: 'underline',
//                     }}
//                 >
//                     Home
//                 </Button>
//                 <Button
//                     color="inherit"
//                     component={Link}
//                     to="/register"
//                     onClick={() => handlePageChange('/register')}
//                     style={{
//                         backgroundColor:
//                             currentPage === '/register' ? 'orange' : 'inherit',
//                         textTransform: 'none',
//                         textDecoration: 'underline',
//                     }}
//                 >
//                     Register
//                 </Button>
//                 <Button
//                     color="inherit"
//                     component={Link}
//                     to="/login"
//                     onClick={() => handlePageChange('/login')}
//                     style={{
//                         backgroundColor:
//                             currentPage === '/login' ? 'orange' : 'inherit',
//                         textTransform: 'none',
//                         textDecoration: 'underline',
//                     }}
//                 >
//                     Sign In
//                 </Button>
//                 <Button
//                     color="inherit"
//                     component={Link}
//                     to="/contact"
//                     onClick={() => handlePageChange('/contact')}
//                     style={{
//                         backgroundColor:
//                             currentPage === '/contact' ? 'orange' : 'inherit',
//                         textTransform: 'none',
//                         textDecoration: 'underline',
//                     }}
//                 >
//                     Contact Us
//                 </Button>
//                 <Button
//                     color="inherit"
//                     component={Link}
//                     to="/about"
//                     onClick={() => handlePageChange('/about')}
//                     style={{
//                         backgroundColor:
//                             currentPage === '/about' ? 'orange' : 'inherit',
//                         textTransform: 'none',
//                         textDecoration: 'underline',
//                     }}
//                 >
//                     About Us
//                 </Button>
//             </Toolbar>
//         </AppBar>
//     )
// }

// export default MyAppBar

import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, Menu,IconButton, MenuItem, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../views/pages/logo.jpg.png';
import MenuIcon from '@mui/icons-material/Menu';



const MyAppBar = () => {
    const [currentPage, setCurrentPage] = useState('/');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)'); // Define breakpoint for mobile view

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setMenuAnchor(null); // Close menu on page change
    };

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: 'green' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
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
                {isMobile ? ( // Render mobile navigation with a menu
                    <>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            style={{
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                            PaperProps={{ style: { backgroundColor: 'green' } }}
                        >
                            <MenuItem
                                component={Link}
                                to="/"
                                onClick={() => handlePageChange('/')}
                                style={{
                                    color:"white",
                                    textDecoration: 'underline'
                                }}
                            >
                                Home
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/register"
                                onClick={() => handlePageChange('/register')}
                                style={{
                                    color:"white",
                                    textDecoration: 'underline'
                                }}
                            >
                                Register
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/login"
                                onClick={() => handlePageChange('/login')}
                                style={{
                                    color:"white",
                                    textDecoration: 'underline'
                                }}
                            >
                                Sign In
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/contact"
                                onClick={() => handlePageChange('/contact')}
                                style={{
                                    color:"white",
                                    textDecoration: 'underline'
                                }}
                            >
                                Contact Us
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to="/about"
                                onClick={() => handlePageChange('/about')}
                                style={{
                                    color:"white",
                                    textDecoration: 'underline'
                                }}
                            >
                                About Us
                            </MenuItem>
                        </Menu>
                    </>
                ) : ( // Render desktop navigation
                    <>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/"
                            onClick={() => handlePageChange('/')}
                            style={{
                                backgroundColor: currentPage === '/' ? 'orange' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Home
                        </MenuItem>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/register"
                            onClick={() => handlePageChange('/register')}
                            style={{
                                backgroundColor: currentPage === '/register' ? 'orange' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Register
                        </MenuItem>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/login"
                            onClick={() => handlePageChange('/login')}
                            style={{
                                backgroundColor: currentPage === '/login' ? 'orange' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Sign In
                        </MenuItem>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/contact"
                            onClick={() => handlePageChange('/contact')}
                            style={{
                                backgroundColor: currentPage === '/contact' ? 'orange' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            Contact Us
                        </MenuItem>
                        <MenuItem
                            color="inherit"
                            component={Link}
                            to="/about"
                            onClick={() => handlePageChange('/about')}
                            style={{
                                backgroundColor: currentPage === '/about' ? 'orange' : 'inherit',
                                textTransform: 'none',
                                textDecoration: 'underline',
                            }}
                        >
                            About Us
                        </MenuItem>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
