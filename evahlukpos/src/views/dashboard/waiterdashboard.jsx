import React from 'react'
import { Paper, Typography, Grid, IconButton, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import OrderIcon from '@mui/icons-material/ShoppingCart'
import TableIcon from '@mui/icons-material/GridOn'
import MenuIcon from '@mui/icons-material/RestaurantMenu'
import HistoryIcon from '@mui/icons-material/History'
import RequestIcon from '@mui/icons-material/ContactSupport'
import PaymentIcon from '@mui/icons-material/MonetizationOn'
import FeedbackIcon from '@mui/icons-material/ThumbUpAlt'
import CommunicationIcon from '@mui/icons-material/Chat'
import ReservationIcon from '@mui/icons-material/EventNote'

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
    button: {
        margin: theme.spacing(1),
    },
}))

const WaiterDashboard = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome, Waiter!
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <OrderIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Order Management
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <TableIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Table Status
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Menu Access
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <HistoryIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Order History
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <RequestIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Customer Requests
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <PaymentIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Payment Processing
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <FeedbackIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Customer Feedback
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <CommunicationIcon />
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
                            <ReservationIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Reservations
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    View Order Details
                </Button>
            </Paper>
        </div>
    )
}

export default WaiterDashboard
