import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { InputLabel, Input, Card, Grid, CardContent, Checkbox } from '@material-ui/core'
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width:'1500px'
        
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        flex: '1 1 auto',
        minWidth: '0',
        fontSize: '1rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        },
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
    button: {
        alignSelf: 'flex-end',
    },
}));

const ManageStock = () => {
    const classes = useStyles();
    const [stockData, setStockData] = useState([]);
    const [editedStockData, setEditedStockData] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    
    const [newStock, setNewStock] = useState({
        stock_name: '',
        original_quantity: '',
        price: '',
        unit: '',
    });

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

    const handleRowSelection = (rowId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowId)) {
                return prevSelectedRows.filter((selectedId) => selectedId !== rowId);
            } else {
                return [...prevSelectedRows, rowId];
            }
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
                Swal.fire('Error', 'Failed to create stock', 'error');
            });
    };

    const handleDelete = () => {
        if (selectedRows.length === 0) {
            Swal.fire('Warning', 'Please select items to delete', 'warning');
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
                const idsToDelete = selectedRows.join(',');

                axios.delete(`https://evahluk-restful-apis.onrender.com/api/stock/delete/?id=${idsToDelete}`)
                    .then(response => {
                        console.log('Stocks deleted successfully:', response.data);
                        fetchStockData();
                        Swal.fire('Deleted!', 'Your stock has been deleted.', 'success');
                        setSelectedRows([]); // Deselect all items after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting stocks:', error);
                        Swal.fire('Error', 'Failed to delete selected stocks', 'error');
                    });
            }
        });
    };
    
    // const handleCellEditCommit = (params) => {
    //     const { id, field, value } = params;
    //     // Update the edited stock data
    //     setEditedStockData(prevState => ({
    //         ...prevState,
    //         [id]: {
    //             ...prevState[id],
    //             [field]: value,
    //         },
    //     }));
    // };

    const handleCellEditCommit = (params) => {
        const { id, field, value } = params;
        // Update the edited stock data
        setEditedStockData(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value,
            },
        }), () => {
            // Log the edited data after the state has been updated
            console.log('Edited stock data:', editedStockData);
        });
    };
    
    

    // Function to construct updatedFields object for PUT request
    const constructUpdatedFields = (selectedRow) => {
        const editedData = editedStockData[selectedRow.id];
        if (!editedData) {
            // No edits for this row, use the current values
            return {
                field_name: ['stock_name', 'original_quantity', 'price', 'unit'],
                field_value: [selectedRow.stock_name, selectedRow.original_quantity, selectedRow.price, selectedRow.unit]
            };
        } else {
            // Use the edited values
            return {
                field_name: Object.keys(editedData),
                field_value: Object.values(editedData),
            };
        }
    };

    // Function to handle update stock button click
    const handleUpdateStock = () => {
        if (selectedRows.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select at least one row to update.',
            });
            return;
        }

        const updatePromises = [];

        // Iterate over selected rows and prepare update requests
        selectedRows.forEach(selectedRowId => {
            // Find the selected row from stock data
            const selectedRow = stockData.find(row => row.id === selectedRowId);

            // Construct updatedFields object based on edited data
            const updatedFields = constructUpdatedFields(selectedRow);
            console.log('Updated fields:', updatedFields);

            // Make the PUT request with updatedFields as the request body
            const updatePromise = axios.put(`http://127.0.0.1:8000/api/stock/update/?id=${selectedRow.id}`, updatedFields);
            updatePromises.push(updatePromise);
        });

        // Wait for all update requests to complete
        Promise.all(updatePromises)
            .then(responses => {
                console.log('Stocks updated successfully:', responses);
                fetchStockData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Stocks updated successfully!',
                });
            })
            .catch(error => {
                console.error('Error updating stocks:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update stocks. Please try again later.',
                });
            });
    };
    
    const columns = [
        {
            field: 'checkbox',
            headerName: 'Select',
            flex: 1,
            renderCell: (params) => (
                <Checkbox
                    color="primary"
                    checked={selectedRows.includes(params.row.id)}
                    onChange={() => handleRowSelection(params.row.id)}
                />
            ),
        },
        { field: 'id', headerName: 'ID', flex: 1, editable: true },
        { field: 'stock_name', headerName: 'Stock Name', flex: 1, editable: true, },
        { field: 'original_quantity', headerName: 'Original Quantity', flex: 1, editable: true },
        { field: 'price', headerName: 'Price', flex: 1, editable: true, },
        { field: 'unit', headerName: 'Unit', flex: 1, editable: true, },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" onClick={() => handleUpdateStock(params.row)}>Update</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row)}>Delete</Button>
                </div>
            ),
        },
    ];

   
    
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setNewStock({
    //         ...newStock,
    //         [name]: value,
    //     });
    // };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStock(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    useEffect(() => {
        console.log('New input values:', newStock);
    }, [newStock]);
    

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
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
            </Paper>


            <Paper className={classes.paper}>
                <DataGrid
                    rows={stockData}
                    columns={columns}
                    onSelectionModelChange={(model) =>
                        setSelectedRows(model)
                    }
                    onCellEditCommit={handleCellEditCommit}
                />
            </Paper>
        </div>
    );
}

export default ManageStock;
