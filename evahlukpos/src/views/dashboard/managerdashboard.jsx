import React from 'react'
import { Paper, Typography, Grid, IconButton, Button } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import ReservationIcon from '@mui/icons-material/EventNote'
import TableIcon from '@mui/icons-material/GridOn'
import EmployeeIcon from '@mui/icons-material/Group'
import InventoryIcon from '@mui/icons-material/Inventory'
import FinanceIcon from '@mui/icons-material/MonetizationOn'
import AnalyticsIcon from '@mui/icons-material/BarChart'

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

const ManagerDashboard = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome, Manager!
                </Typography>

                <Grid container spacing={3} justifyContent="center">
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
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <TableIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Table Occupancy
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <EmployeeIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Employee Management
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <InventoryIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Inventory
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <FinanceIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Financial Reports
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            className={classes.iconButton}
                            color="primary"
                        >
                            <AnalyticsIcon />
                        </IconButton>
                        <Typography variant="h6" align="center">
                            Analytics
                        </Typography>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    View Detailed Reports
                </Button>
            </Paper>
        </div>
    )
}

export default ManagerDashboard
