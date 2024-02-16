import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import { List, ListItem, ListItemText } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import WaiterDashboard from '../dashboard/waiterdashboard'
import Profile from '../pages/WaiterProfile'
import ManageOrders from '../pages/Manageorders'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'green',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    listItem: {
        '&.Mui-selected': {
            backgroundColor: 'purple',
            color: 'white',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    profileIcon: {
        marginLeft: 'auto',
    },
    footer: {
        marginTop: 'auto',
        height: '10px',
        backgroundColor: 'green',
        padding: theme.spacing(2),
        width: '100%',
        color: 'white',
        position: 'fixed',
        bottom: 0,
        textAlign: 'center',
        zIndex: theme.zIndex.drawer + 1,
        left: 0,

        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: '1.2rem',
        },

        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(4),
            fontSize: '1.5rem',
        },
    },
}))

const WaiterSidebar = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState('Waiterdashboard')

    const [userDetails, setUserDetails] = useState({})
    const [username, setUsername] = useState({ username: '' })

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const storedUsername = localStorage.getItem('username')
                if (storedUsername) {
                    setUsername(storedUsername)
                    const response = await axios.get(
                        `https://restaurant-management-pos-11a9f9c27639.herokuapp.com/api/getuserbyusername/?username=${storedUsername}`
                    )
                    setUserDetails(response.data)
                }
            } catch (error) {
                console.error('Error fetching user details:', error)
            }
        }
        fetchUserDetails()
    }, [username])

    const renderProfilePicture = () => {
        if (userDetails && userDetails.user_image) {
            return (
                <Avatar
                    src={`http://localhost:8000${userDetails.user_image}`}
                    alt="Profile Picture"
                />
            )
        }
        return <AccountCircleIcon />
    }

    const handleLogout = async () => {
        try {
            const storedToken = localStorage.getItem('token')
            console.log('storedToken', storedToken)
            if (!storedToken) {
                console.error('No authentication token found')
                return
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            if (storedToken) {
                config.headers['Authorization'] = `Token ${storedToken}`
            }
            await axios.post('https://restaurant-management-pos-11a9f9c27639.herokuapp.com/api/logout/', null, config)
            localStorage.removeItem('token')
            window.location.href = '/login'
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const [anchorEl, setAnchorEl] = useState(null)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null)
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'Waiterdashboard':
                return <WaiterDashboard />
            case 'Profile':
                return <Profile />
            case 'Manageorders':
                return <ManageOrders />
            default:
                return <WaiterDashboard />
        }
    }

    return (
        <div className={classes.container}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.profileIcon}>
                        <IconButton
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            {renderProfilePicture()}
                        </IconButton>
                        <Menu
                            id="profile-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem
                                onClick={() => handlePageChange('Profile')}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            <MenuItem onClick={handleProfileMenuClose}>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleProfileMenuClose}>
                                Notifications
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
                style={{ zIndex: 98 }}
            >
                <List>
                    <ListItem
                        className={classes.listItem}
                        selected={currentPage === 'Waiterdashboard'}
                        button
                        onClick={() => handlePageChange('Waiterdashboard')}
                    >
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        selected={currentPage === 'Profile'}
                        button
                        onClick={() => handlePageChange('Profile')}
                    >
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        selected={currentPage === 'Manageorders'}
                        button
                        onClick={() => handlePageChange('Manageorders')}
                    >
                        <ListItemText primary="Manage Orders" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {renderPage()}
            </main>
        </div>
    )
}

export default WaiterSidebar
