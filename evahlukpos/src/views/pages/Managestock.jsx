import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Card, Grid, CardContent, Typography, TextField, Button, Box, Modal, useTheme} from '@material-ui/core'
import Swal from 'sweetalert2';
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


const ManageStock = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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

        const url = `https://evahluk-restful-apis.onrender.com/api/stock/create/?stock_name=${stock_name}&price=${price}&original_quantity=${original_quantity}&unit=${unit}`;

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
        setSelectedRows(row);
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
                axios.delete(`https://evahluk-restful-apis.onrender.com/api/stock/delete/?id=${id}`)
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

        const updatePromise = axios.put(`https://evahluk-restful-apis.onrender.com/api/stock/update/?id=${selectedRows.id}`, updatedFieldsObj);

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
        { field: 'id', headerName: 'Id' ,},
        { field: 'stock_name', headerName: 'Name',  },
        { field: 'original_quantity', headerName: 'Quantity',  },
        { field: 'price', headerName: 'Price',  },
        { field: 'unit', headerName: 'Unit' , },
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
                    update
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
                    delete
                </Button>
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
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Stock
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Name</Typography>
                                <TextField
                                    id="stock-name"
                                    type="text"
                                    name="stock_name"
                                    value={newStock.stock_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                                <TextField
                                    id="original-quantity"
                                    type="number"
                                    name="original_quantity"
                                    value={newStock.original_quantity}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                                <TextField
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={newStock.price}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Unit</Typography>
                                <TextField
                                    id="unit"
                                    type="text"
                                    name="unit"
                                    value={newStock.unit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className="editButton" variant="contained" color="primary" onClick={handleCreateStock}>Create</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <br />


            <div className={classes.container}>
                <div className={classes.dataGrid}>
                    <DataGrid
                        rows={stockData}
                        columns={columns}
                        checkboxSelection
                    />
                    <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <div className={classes.modalContainer}>
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
                                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>Update Stock Details</Typography>
                                {selectedRows && (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8} sm={4}>
                                                <Typography variant="subtitle1" color="textPrimary">Name</Typography>
                                                <TextField
                                                    id="stock-name"
                                                    type="text"
                                                    name="stock_name"
                                                    variant="outlined"
                                                    value={modalStock.stock_name}
                                                    onChange={handleModalInputChange}
                                                    fullWidth
                                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                                                <TextField
                                                    id="original-quantity"
                                                    type="number"
                                                    name="original_quantity"
                                                    variant="outlined"
                                                    value={modalStock.original_quantity}
                                                    onChange={handleModalInputChange}
                                                    fullWidth
                                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                                                <TextField
                                                    id="price"
                                                    type="number"
                                                    name="price"
                                                    variant="outlined"
                                                    value={modalStock.price}
                                                    onChange={handleModalInputChange}
                                                    fullWidth
                                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Unit</Typography>
                                                <TextField
                                                    id="unit"
                                                    type="text"
                                                    name="unit"
                                                    variant="outlined"
                                                    value={modalStock.unit}
                                                    onChange={handleModalInputChange}
                                                    fullWidth
                                                    InputLabelProps={{ style: { color: 'black' } }} // Set label color
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }} // Set input font size
                                                />
                                            </Grid>
                                        </Grid>

                                    </>
                                )}
                                <br />
                                <Button
                                    onClick={handleSaveChanges}
                                    variant="contained"
                                    color="primary"
                                    className="editButton"
                                >
                                    save
                                </Button>

                                <Button
                                    onClick={handleCloseModal}
                                    variant="contained"
                                    color="primary"
                                    className="editButton"
                                    style={{ marginLeft: '10px' }}
                                >
                                    cancel
                                </Button>
                            </Box>
                        </div>
                    </Modal>
                </div>
            </div>
        </>

    );
}

export default ManageStock;

