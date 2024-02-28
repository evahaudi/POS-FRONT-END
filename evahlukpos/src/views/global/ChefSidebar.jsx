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
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import Profile from '../pages/ChefProfile'
import ManageOrders from '../pages/Manageorders'
import ManageIngredients from '../pages/ManageIngredients'
import ChefDashboard from '../dashboard/chefdashbboard'


const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'green',
    },
    listItem: {
        '&.Mui-selected': {
            backgroundColor: 'purple',
            color: 'white',
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: theme.spacing(8),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    profileIcon: {
        marginLeft: 'auto',
    },
}))

const ChefSidebar = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState('chefdashboard')
    const [userDetails, setUserDetails] = useState({})
    const [username, setUsername] = useState({ username: '' })

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const storedUsername = localStorage.getItem('username')
                if (storedUsername) {
                    setUsername(storedUsername)
                    const response = await axios.get(
                        `https://evahluk-restful-apis.onrender.com/api/getuserbyusername/?username=${storedUsername}`
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
                    src={`https://evahluk-restful-apis.onrender.com/media/user_images/${userDetails.user_image}`}
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
            await axios.post('https://evahluk-restful-apis.onrender.com/api/logout/', null, config)
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
        if (!window.matchMedia('(min-width: 600px)').matches) {
            setOpen(false)
        }
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
            case 'Chefdashboard':
                return <ChefDashboard />
            case 'Profile':
                return <Profile />
            case 'Manageingredients':
                return <ManageIngredients />
            case 'Manageorders':
                return <ManageOrders />
            default:
                return <ChefDashboard />
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
                        selected={currentPage === 'Chefdashboard'}
                        button
                        onClick={() => handlePageChange('Chefdashboard')}
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
                    <ListItem
                        className={classes.listItem}
                        selected={currentPage === 'Manageingredients'}
                        button
                        onClick={() => handlePageChange('Manageingredients')}
                    >
                        <ListItemText primary="Manage Ingredients" />
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

export default ChefSidebar
