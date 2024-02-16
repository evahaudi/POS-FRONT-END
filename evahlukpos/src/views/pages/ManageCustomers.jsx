import { Paper, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
    },
}))

const ManageCustomers = () => {
    const classes = useStyles()

    return (
        <div>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome
                </Typography>
            </Paper>
        </div>
    )
}

export default ManageCustomers
