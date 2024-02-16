import React from 'react'
import { Paper, Typography, Grid, Button, IconButton } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import TimerIcon from '@mui/icons-material/Timer'
import ChatIcon from '@mui/icons-material/Chat'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BarChartIcon from '@mui/icons-material/BarChart'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(3),
        maxHeight: '900px',
        maxWidth: '1800px',
        overflowY: 'auto',
        minHeight: '100vh',
        minWidth: '100vh',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    iconButton: {
        marginRight: theme.spacing(1),
    },
}))

const ChefDashboard = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome, Chef!
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <TimerIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Kitchen Timers
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <ChatIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Communication Hub
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <MenuBookIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Recipe Book
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <AssignmentIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Order Status
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            View Order Details
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <BarChartIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Analytics
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ChefDashboard
