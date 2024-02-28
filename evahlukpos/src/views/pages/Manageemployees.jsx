
// import React from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import Paper from '@material-ui/core/Paper';
// // import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     paper: {
//         padding: theme.spacing(3),
//         overflow: 'auto',
//         background: 'white',
//         position: 'flex',
//         width: '100%',
//         height:'100%', 
//         margin: 0,
//         flexGrow:1,
//         flexDirection:'column'
//         // '@media (max-width: 600px)': {
//         //     width: '70%',
//         //     fontSize:'9px'
//         //   },
//     },
//     dataGrid: {
//         '& .MuiDataGrid-row': {
//             color: 'black',
//             borderBottom: 'none',
//             fontFamily: 'Roboto, sans-serif',
//             fontSize: 14,
//             [theme.breakpoints.down('sm')]: {
//                 fontSize: 10, // Adjust font size for smaller screens
//             },
//         },
//         '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: 'black',
//             color: 'white',
//             borderBottom: 'none',
//             fontFamily: 'Roboto, sans-serif',
//             fontSize: 16,
//             [theme.breakpoints.down('sm')]: {
//                 fontSize: 12, // Adjust font size for smaller screens
//             },
//         },
//         '& .MuiDataGrid-cell': {
//             borderBottom: '0.5px solid',
//             fontFamily: 'Roboto, sans-serif',
//             fontSize: 14,
//             [theme.breakpoints.down('sm')]: {
//                 fontSize: 11, // Adjust font size for smaller screens
//             },
//         },
//         '& .MuiDataGrid-virtualScroller': {
//             backgroundColor: 'white',
//         },
//         '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-row:focus': {
//             outline: 'none',
//         },
//     },
// }));

// function ManageEmployees() {
//     const classes = useStyles();
   

//     const employees = [
//         { id: 1, username: 'user1', fullname: 'John Doe', email: 'john@example.com', location: 'New York', department: 'Engineering', role: 'Chef', phone: '1234567890', status: 'Active', age: 30, gender: 'Male', password:'1234', user_image:'pic' },
//         { id: 2, username: 'user2', fullname: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', department: 'HR', role: 'Waiter', phone: '0987654321', status: 'Inactive', age: 25, gender: 'Female', password:'1234', user_image:'pic' },
//         { id: 3, username: 'user1', fullname: 'John Doe', email: 'john@example.com', location: 'New York', department: 'Engineering', role: 'Chef', phone: '1234567890', status: 'Active', age: 30, gender: 'Male', password:'1234', user_image:'pic' },
//         { id: 4, username: 'user2', fullname: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', department: 'HR', role: 'Waiter', phone: '0987654321', status: 'Inactive', age: 25, gender: 'Female', password:'1234', user_image:'pic' },
//     ];

//     const columns = [
//         { field: 'id', headerName: 'ID',  },
//         { field: 'username', headerName: 'Username',  },
//         { field: 'fullname', headerName: 'Full Name',  },
//         { field: 'email', headerName: 'Email',  },
//         { field: 'password', headerName: 'Password',  },
//         { field: 'user_image', headerName: 'Profile pic', },
//         { field: 'location', headerName: 'Location',  },
//         { field: 'department', headerName: 'Department',  },
//         { field: 'role', headerName: 'Role',  },
//         { field: 'phone', headerName: 'Phone',  },
//         { field: 'status', headerName: 'Status', },
//         { field: 'age', headerName: 'Age',  },
//         { field: 'gender', headerName: 'Gender', },
//     ];
//     const totalWidth = columns.reduce((acc, column) => acc + column.width, 0);

//     return (
//         <Paper className={classes.paper}>
//                     <div style={{ width: '100%',height:'100%', flexDirection: 'column', overflow:'auto', flex: 1, display: 'flex', overflowX: 'auto' }} >
//                         <DataGrid
//                             className={classes.dataGrid}
//                             rows={employees}
//                             columns={columns}
//                             scrollbarSize={10} 
//                             components={{
//                                 Toolbar: GridToolbar,
//                             }}
//                             pageSize={5}
//                             style={{ width: totalWidth }}
//                             autoHeight
//                             checkboxSelection
//                         />
//                     </div>
//         </Paper>
//     );
// }

// export default ManageEmployees;

import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Box, Modal } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { InputLabel, Input, Card, Grid, CardContent } from '@material-ui/core'
import Swal from 'sweetalert2';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: theme.spacing(2),
//         width: '1200px'

//     },
//     paper: {
//         padding: theme.spacing(2),
//         margin: theme.spacing(2),
//         flex: '1 1 auto',
//         minWidth: '0',
//         fontSize: '1rem',
//         [theme.breakpoints.down('sm')]: {
//             fontSize: '0.875rem',
//         },
//     },
//     formContainer: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: theme.spacing(2),
//         maxWidth: '400px',
//         alignSelf: 'center',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: theme.spacing(2),
//         marginBottom: theme.spacing(2),
//     },
//     button: {
//         alignSelf: 'flex-end',
//     },
// }));

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      backgroundColor:"white",
      minHeight: '300px',
      flexDirection: 'column',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        width:'370px',
        
      },
      [theme.breakpoints.down('xs')]: {
          minHeight: '200px', // Adjust minimum height for smaller screens
        },
    },
    dataGrid: {
      width: '100%',
      '& .MuiDataGrid-root': {
        fontSize: 10,
        [theme.breakpoints.down('sm')]: {
          fontSize: 8,
          minWidth:'350px'
        },
      },
      
      '& .MuiDataGrid-columnHeaders':{
          fontSize: 12,
          backgroundColor: 'black',
        [theme.breakpoints.down('sm')]: {
          fontSize: 9,
          backgroundColor: 'black',
         
          
        },
      },
     
        "& .MuiDataGrid-virtualScroller": {
          '& .MuiDataGrid-renderingZone': {
              '& .MuiDataGrid-row': {
                '&:nth-child(2n)': { 
                  backgroundColor: 'green', 
                }
              }
            },
            "& .MuiDataGrid-footerContainer-text": {
              
              backgroundColor: 'green',
           
            },
          
        },
      '& .MuiDataGrid-cell': {
          fontSize: 12,
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
          paddingLeft: 4,
          paddingRight: 4,
          
        },
      },
      '& .MuiButton-label': {
        fontSize: 10,
        [theme.breakpoints.down('sm')]: {
          fontSize: 10,
        },
      },
      '& .MuiButton': {
          width: 20,
          height: 30,
          [theme.breakpoints.down('sm')]: {
            width: 5,
            height: 30,
          },
        },
      '& .Button': {
          width: 20,
          height: 30,
          fontSize: 4,
          [theme.breakpoints.down('sm')]: {
            width: 10,
            height: 20,
            fontSize: 5,
          },
        },
        '& .MuiDataGrid-Pagination-text': {
          fontSize: 1,
          [theme.breakpoints.down('sm')]: {
            fontSize: 9,
          },
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color:'green',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            maxWidth: '400px',
            alignSelf: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        '& .MuiCheckbox-root': {
          width: 20,
          height: 20,
          color:'black',
          [theme.breakpoints.down('sm')]: {
            width: '5px',
            height: '5px',
            color:'green'
          },
        },
      
    },
  }));
  
const ManageEmployees = () => {
    const classes = useStyles();
    const [stockData, setStockData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);
    const [modalStock, setModalStock] = useState({
        stock_name: '',
        original_quantity: '',
        price: '',
        unit: '',
    });
    const [newStock, setNewStock] = useState({
        stock_name: '',
        original_quantity: '',
        price: '',
        unit: '',
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/stock/getall/')
            .then(response => {
                setStockData(response.data);
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
            });
    };

    const handleCreateStock = () => {
        const { stock_name, original_quantity, price, unit } = newStock;
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('User token not found.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        const url = `http://127.0.0.1:8000/api/stock/create/?stock_name=${stock_name}&price=${price}&original_quantity=${original_quantity}&unit=${unit}`;

        axios.post(url, {}, config)
            .then(response => {
                console.log('Stock created successfully:', response.data);
                fetchStockData();
                Swal.fire('Success', 'Stock created successfully', 'success');
                setNewStock({
                    stock_name: '',
                    original_quantity: '',
                    price: '',
                    unit: '',
                });
            })
            .catch(error => {
                console.error('Error creating stock:', error);
                Swal.fire('Error', 'Failed to create stock stock_name Already exist', 'error');
            });
    };

    const handleDelete = (row) => {
        console.log('Row data:', row); // Check the contents of the row object
        const id = row.id;

        if (!selectedRows) {
            Swal.fire('Warning', 'Please select an item to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this stock item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/stock/delete/?id=${id}`)
                    .then(response => {
                        console.log('Stock deleted successfully:', response.data);
                        fetchStockData();
                        Swal.fire('Deleted!', 'Your stock has been deleted.', 'success');
                        setSelectedRows(null); // Deselect the item after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting stock:', error);
                        Swal.fire('Error', 'Failed to delete the selected stock', 'error');
                    });
            }
        });
    };

    const handleSaveChanges = () => {
        if (!selectedRows) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a row to update.',
            });
            return;
        }

        // Merge selectedRows and modalStock objects
        const updatedFields = { ...selectedRows, ...modalStock };

        // Remove the 'id' field from the merged object
        delete updatedFields.id;
        delete updatedFields.user;
        delete updatedFields.created_by;
        delete updatedFields.created_at;

        // Extract field names and values from the updatedFields object
        const fieldNames = Object.keys(updatedFields);
        const fieldValues = Object.values(updatedFields);

        // Construct updatedFields object with field_name and field_value properties
        const updatedFieldsObj = {
            field_name: fieldNames,
            field_value: fieldValues,
        };

        console.log('Updated Fields:', updatedFieldsObj);

        const updatePromise = axios.put(`http://127.0.0.1:8000/api/stock/update/?id=${selectedRows.id}`, updatedFieldsObj);

        updatePromise.then(response => {
            console.log('Stock updated successfully:', response.data);
            fetchStockData(); // Refresh data
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Stock updated successfully!',
            });
            
            setOpen(false);
            setSelectedRows(null);
        }).catch(error => {
            console.error('Error updating stock:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update stock. Please try again later.',
            });
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, width: 100 },
        { field: 'stock_name', headerName: 'Stock Name', flex: 1, width: 100 },
        { field: 'original_quantity', headerName: 'Original Quantity', width: 100, flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1, width: 100 },
        { field: 'unit', headerName: 'Unit', flex: 1, width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(params.row)}>Update</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row)}>Delete</Button>
                </div>
            ),
        },
    ];


    const handleEdit = (row) => {
        setSelectedRows(row);
        setModalStock({
            stock_name: row.stock_name,
            original_quantity: row.original_quantity,
            price: row.price,
            unit: row.unit,
        });
        setOpen(true);
    };


    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStock(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Updating ${name} to ${value}`);
        setModalStock(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
            <>
            <div className={classes.container}>
            <div className={classes.formContainer}>
            
            
                <Typography variant="h1" align="center" gutterBottom>
                    Manage Stock
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="stock-name">Stock Name</InputLabel>
                                <Input
                                    id="stock-name"
                                    type="text"
                                    name="stock_name"
                                    value={newStock.stock_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="original-quantity">Original Quantity</InputLabel>
                                <Input
                                    id="original-quantity"
                                    type="number"
                                    name="original_quantity"
                                    value={newStock.original_quantity}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="price">Price</InputLabel>
                                <Input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={newStock.price}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="unit">Unit</InputLabel>
                                <Input
                                    id="unit"
                                    type="text"
                                    name="unit"
                                    value={newStock.unit}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.button} variant="contained" color="primary" onClick={handleCreateStock}>Create Stock</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div> 
            

             <div className={classes.dataGrid}>
                <DataGrid
                    rows={stockData}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    
                />
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2 id="modal-title">Update Stock Details</h2>
                        {selectedRows && (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="stock-name">Stock Name</InputLabel>
                                        <Input
                                            id="stock-name"
                                            type="text"
                                            name="stock_name"
                                            value={modalStock.stock_name}
                                            onChange={handleModalInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="original-quantity">Original Quantity</InputLabel>
                                        <Input
                                            id="original-quantity"
                                            type="number"
                                            name="original_quantity"
                                            value={modalStock.original_quantity}
                                            onChange={handleModalInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="price">Price</InputLabel>
                                        <Input
                                            id="price"
                                            type="number"
                                            name="price"
                                            value={modalStock.price}
                                            onChange={handleModalInputChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel htmlFor="unit">Unit</InputLabel>
                                        <Input
                                            id="unit"
                                            type="text"
                                            name="unit"
                                            value={modalStock.unit}
                                            onChange={handleModalInputChange}

                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        <Button
                            onClick={handleSaveChanges}
                            variant="contained"
                            color="primary"
                        >
                            Save Changes
                        </Button>
                        <Button
                            onClick={handleCloseModal}
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>
            </div>
            </div>
        </>
    );
}

export default ManageEmployees;



