
import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        overflow: 'auto',
        background: 'white',
        position: 'flex',
        width: '100%',
        height:'100%', 
        margin: 0,
        flexGrow:1,
        flexDirection:'column'
        // '@media (max-width: 600px)': {
        //     width: '70%',
        //     fontSize:'9px'
        //   },
    },
    dataGrid: {
        '& .MuiDataGrid-row': {
            color: 'black',
            borderBottom: 'none',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
                fontSize: 10, // Adjust font size for smaller screens
            },
        },
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'black',
            color: 'white',
            borderBottom: 'none',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 16,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12, // Adjust font size for smaller screens
            },
        },
        '& .MuiDataGrid-cell': {
            borderBottom: '0.5px solid',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
                fontSize: 11, // Adjust font size for smaller screens
            },
        },
        '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'white',
        },
        '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-row:focus': {
            outline: 'none',
        },
    },
}));

function ManageEmployees() {
    const classes = useStyles();
   

    const employees = [
        { id: 1, username: 'user1', fullname: 'John Doe', email: 'john@example.com', location: 'New York', department: 'Engineering', role: 'Chef', phone: '1234567890', status: 'Active', age: 30, gender: 'Male', password:'1234', user_image:'pic' },
        { id: 2, username: 'user2', fullname: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', department: 'HR', role: 'Waiter', phone: '0987654321', status: 'Inactive', age: 25, gender: 'Female', password:'1234', user_image:'pic' },
        { id: 3, username: 'user1', fullname: 'John Doe', email: 'john@example.com', location: 'New York', department: 'Engineering', role: 'Chef', phone: '1234567890', status: 'Active', age: 30, gender: 'Male', password:'1234', user_image:'pic' },
        { id: 4, username: 'user2', fullname: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', department: 'HR', role: 'Waiter', phone: '0987654321', status: 'Inactive', age: 25, gender: 'Female', password:'1234', user_image:'pic' },
    ];

    const columns = [
        { field: 'id', headerName: 'ID',  },
        { field: 'username', headerName: 'Username',  },
        { field: 'fullname', headerName: 'Full Name',  },
        { field: 'email', headerName: 'Email',  },
        { field: 'password', headerName: 'Password',  },
        { field: 'user_image', headerName: 'Profile pic', },
        { field: 'location', headerName: 'Location',  },
        { field: 'department', headerName: 'Department',  },
        { field: 'role', headerName: 'Role',  },
        { field: 'phone', headerName: 'Phone',  },
        { field: 'status', headerName: 'Status', },
        { field: 'age', headerName: 'Age',  },
        { field: 'gender', headerName: 'Gender', },
    ];
    const totalWidth = columns.reduce((acc, column) => acc + column.width, 0);

    return (
        <Paper className={classes.paper}>
                    <div style={{ width: '100%',height:'100%', flexDirection: 'column', overflow:'auto', flex: 1, display: 'flex', overflowX: 'auto' }} >
                        <DataGrid
                            className={classes.dataGrid}
                            rows={employees}
                            columns={columns}
                            scrollbarSize={10} 
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            pageSize={5}
                            style={{ width: totalWidth }}
                            autoHeight
                            checkboxSelection
                        />
                    </div>
        </Paper>
    );
}

export default ManageEmployees;

