import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Card, Grid, CardContent, Typography, TextField, Button, Box, Modal, useTheme} from '@material-ui/core'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        backgroundColor: "white",
        minHeight: '300px',
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            width: '370px',

        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '200px', // Adjust minimum height for smaller screens
        },
    },
    modalContainer: {
        position: 'absolute',
        width: '80%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '2px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    dataGrid: {
        width: '100%',
        '& .MuiDataGrid-root': {
            fontSize: 30,
            [theme.breakpoints.down('sm')]: {
                
                fontSize: 8,
                minWidth: '350px'
            },
        },

        '& .MuiDataGrid-columnHeaders': {
            fontSize: 18,
            color: 'white',
            backgroundColor: 'black',
            whiteSpace: 'normal',
            minWidth: '150px',
            maxHeight: '50px',
            [theme.breakpoints.down('sm')]: {
                fontSize: 9,
                color: 'white',
                backgroundColor: 'black',
                minWidth: '500px', 
                maxHeight: '50px',
                whiteSpace: 'normal',
                overflow: 'visible',
            },
        },
           
        "& .MuiDataGrid-Pagination-selectionLabel": {
              fontSize:20,
            [theme.breakpoints.down('sm')]: {
                fontSize: 5,
            },
          },
        '& .MuiDataGrid-row:nth-child(even)':{
            backgroundColor: 'grey'
          },
        '& .MuiDataGrid-cell': {
            fontSize: 12,
            whiteSpace: 'unset',
            width: 200,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
                paddingLeft: 4,
                paddingRight: 4,
                overflow: 'visible',
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
        '& .MuiCheckbox-root': {
            width: 20,
            height: 20,
            color: 'green',
            [theme.breakpoints.down('sm')]: {
                width: '5px',
                height: '5px',
                color: 'green'
            },
        },

    },
}));


const ManageOrders = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [orderData, setOrderData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);
    const [modalOrder, setModalOrder] = useState({
        items: '',
        customer_name: '',
        table_number: '',
        quantity: '',
        duration: '',
        delivery_time: '',
        payment_status: false,
        total_amount: '',
    });
    const [newOrder, setNewOrder] = useState({
        items: '',
        customer_name: '',
        table_number: '',
        quantity: '',
        duration: '',
        delivery_time: '',
        payment_status: false,
        total_amount: '',
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/order/getall/')
            .then(response => {
                setOrderData(response.data);
            })
            .catch(error => {
                console.error('Error fetching order data:', error);
            });
    };

    console.log("order data response:" ,orderData)

    const handleCreateOrder = () => {
        const { items, customer_name, table_number, quantity, duration, delivery_time, payment_status, total_amount } = newOrder;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const orderData = {
            items,
            customer_name,
            table_number,
            quantity,
            duration,
            delivery_time,
            payment_status,
            total_amount,
        };

        axios.post('https://evahluk-restful-apis.onrender.com/api/order/create/', orderData, config)
            .then(response => {
                console.log('Order created successfully:', response.data);
                fetchOrderData();
                Swal.fire('Success', 'Order created successfully', 'success');
                setNewOrder({
                    items: '',
                    customer_name: '',
                    table_number: '',
                    quantity: '',
                    duration: '',
                    delivery_time: '',
                    payment_status: false,
                    total_amount: '',
                });
            })
            .catch(error => {
                console.error('Error creating order:', error);
                Swal.fire('Error', 'Failed to create order', 'error');
            });
    };

    const handleDelete = (row) => {
        setSelectedRows(row);
        console.log('Row data:', row); // Check the contents of the row object
        const id = row.id;

        if (!selectedRows) {
            Swal.fire('Warning', 'Please select an item to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this order!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`https://evahluk-restful-apis.onrender.com/api/order/delete/${id}/`)
                    .then(response => {
                        console.log('Order deleted successfully:', response.data);
                        fetchOrderData();
                        Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
                        setSelectedRows(null); // Deselect the item after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting order:', error);
                        Swal.fire('Error', 'Failed to delete the selected order', 'error');
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

        const { items, customer_name, table_number, quantity, duration, delivery_time, payment_status, total_amount } = modalOrder;
        const id = selectedRows.id;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const orderData = {
            items,
            customer_name,
            table_number,
            quantity,
            duration,
            delivery_time,
            payment_status,
            total_amount,
        };

        axios.put(`http://127.0.0.1:8000/api/order/update/${id}/`, orderData, config)
            .then(response => {
                console.log('Order updated successfully:', response.data);
                fetchOrderData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Order updated successfully!',
                });

                setOpen(false);
                setSelectedRows(null);
            })
            .catch(error => {
                console.error('Error updating order:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update order. Please try again later.',
                });
            });
    };

    const columns = [
        { field: 'id', headerName: 'Id' ,},
        { field: 'items', headerName: 'Items',  },
        { field: 'customer_name', headerName: 'Customer Name',  },
        { field: 'table_number', headerName: 'Table Number',  },
        { field: 'quantity', headerName: 'Quantity' , },
        { field: 'duration', headerName: 'Duration',  },
        { field: 'delivery_time', headerName: 'Delivery Time' , },
        { field: 'payment_status', headerName: 'Payment Status',  },
        { field: 'total_amount', headerName: 'Total Amount' , },
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: (params) => (
                <Button
                    className="editButton"
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                >
                    Update
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params) => (
                <Button
                    className="editButton"
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(params.row)}
                >
                    Delete
                </Button>
            ),
        },

    ];


    const handleEdit = (row) => {
        setSelectedRows(row);
        setModalOrder({
            items: row.items,
            customer_name: row.customer_name,
            table_number: row.table_number,
            quantity: row.quantity,
            duration: row.duration,
            delivery_time: row.delivery_time,
            payment_status: row.payment_status,
            total_amount: row.total_amount,
        });
        setOpen(true);
    };


    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewOrder(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Updating ${name} to ${value}`);
        setModalOrder(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const getRowId = (row) => {
        // Generate a unique ID based on row data
        return uuidv4();
      };
      
    return (
        <>
            <div className={classes.container}>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Orders
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Items</Typography>
                                <TextField
                                    id="items"
                                    type="text"
                                    name="items"
                                    value={newOrder.items}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Customer Name</Typography>
                                <TextField
                                    id="customer-name"
                                    type="text"
                                    name="customer_name"
                                    value={newOrder.customer_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Table Number</Typography>
                                <TextField
                                    id="table-number"
                                    type="text"
                                    name="table_number"
                                    value={newOrder.table_number}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                                <TextField
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    value={newOrder.quantity}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Duration</Typography>
                                <TextField
                                    id="duration"
                                    type="text"
                                    name="duration"
                                    value={newOrder.duration}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Delivery Time</Typography>
                                <TextField
                                    id="delivery-time"
                                    type="text"
                                    name="delivery_time"
                                    value={newOrder.delivery_time}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Payment Status</Typography>
                                <TextField
                                    id="payment-status"
                                    type="text"
                                    name="payment_status"
                                    value={newOrder.payment_status}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Total Amount</Typography>
                                <TextField
                                    id="total-amount"
                                    type="text"
                                    name="total_amount"
                                    value={newOrder.total_amount}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" onClick={handleCreateOrder}>
                                    Create Order
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Box mt={2}>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            className={classes.dataGrid}
                            rows={orderData}
                            columns={columns}
                            pageSize={10}
                            getRowId={getRowId}
                            rowsPerPageOptions={[10, 20, 50]}
                            checkboxSelection
                        />
                    </div>
                </Box>
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className={classes.modalContainer}>
                        <Typography variant="h6">Edit Order</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Items</Typography>
                                <TextField
                                    id="modal-items"
                                    type="text"
                                    name="items"
                                    value={modalOrder.items}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Customer Name</Typography>
                                <TextField
                                    id="modal-customer-name"
                                    type="text"
                                    name="customer_name"
                                    value={modalOrder.customer_name}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Table Number</Typography>
                                <TextField
                                    id="modal-table-number"
                                    type="text"
                                    name="table_number"
                                    value={modalOrder.table_number}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                                <TextField
                                    id="modal-quantity"
                                    type="number"
                                    name="quantity"
                                    value={modalOrder.quantity}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Duration</Typography>
                                <TextField
                                    id="modal-duration"
                                    type="text"
                                    name="duration"
                                    value={modalOrder.duration}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Delivery Time</Typography>
                                <TextField
                                    id="modal-delivery-time"
                                    type="text"
                                    name="delivery_time"
                                    value={modalOrder.delivery_time}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Payment Status</Typography>
                                <TextField
                                    id="modal-payment-status"
                                    type="text"
                                    name="payment_status"
                                    value={modalOrder.payment_status}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">Total Amount</Typography>
                                <TextField
                                    id="modal-total-amount"
                                    type="text"
                                    name="total_amount"
                                    value={modalOrder.total_amount}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default ManageOrders;
