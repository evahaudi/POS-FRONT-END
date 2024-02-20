import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { Input } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
    },
}))

const Profile = () => {
    const classes = useStyles()
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

    const imageUrl = `https://evahluk-restful-apis.onrender.com/media/user_images/${userDetails.user_image}`
    const handleUpdateDetails = () => {}
    

    return (
        <>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                 Profile Details!
                </Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        {userDetails.user_image && (
                            <Avatar
                                src={imageUrl}
                                alt="User"
                                className={classes.avatar}
                            />
                        )}
                        <Typography>Profile picture</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.username}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="fullName">Full Name</InputLabel>
                        <Input
                            id="fullName"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.fullname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="dob">Date of Birth</InputLabel>
                        <Input
                            id="dob"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.birthdate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="location">Location</InputLabel>
                        <Input
                            id="location"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.location}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="experience">
                            Experience years
                        </InputLabel>
                        <Input
                            id="experience"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.experienceyears}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input
                            id="phone"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.phone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="department">Department</InputLabel>
                        <Input
                            id="department"
                            placeholder="Type in here…"
                            variant="outlined"
                            value={userDetails.department}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <InputLabel htmlFor="password">Password:</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            value={userDetails.password}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateDetails}
                >
                    Update Details
                </Button>
            </Paper>
            <br />
            <br />
            <br />
        </>
    )
}

export default Profile
