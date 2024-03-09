import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Modal, Grid } from '@material-ui/core';
import Swal from 'sweetalert2';

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
}));

const ManageIngredients = () => {
    const classes = useStyles();
    const [ingredientsData, setIngredientsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);
    const [modalIngredient, setModalIngredient] = useState({
        ingredient_name: '',
        quantity: '',
        unit: '',
        price: ''
    });
    const [newIngredient, setNewIngredient] = useState({
        ingredient_name: '',
        quantity: '',
        unit: '',
        price: ''
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchIngredientsData();
    }, []);

    const fetchIngredientsData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/ingredientsusage/get')
            .then(response => {
                setIngredientsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients data:', error);
            });
    };

    const handleCreateIngredient = () => {
        const { ingredient_name, quantity, unit, price } = newIngredient;

        axios.post('https://evahluk-restful-apis.onrender.com/api/ingredientsusage/create', {
            ingredient_name,
            quantity,
            unit,
            price
        })
            .then(response => {
                console.log('Ingredient created successfully:', response.data);
                fetchIngredientsData();
                Swal.fire('Success', 'Ingredient created successfully', 'success');
                setNewIngredient({
                    ingredient_name: '',
                    quantity: '',
                    unit: '',
                    price: ''
                });
            })
            .catch(error => {
                console.error('Error creating ingredient:', error);
                Swal.fire('Error', 'Failed to create ingredient', 'error');
            });
    };

    const handleDelete = (row) => {
        setSelectedRows(row);
        const id = row.id;

        if (!selectedRows) {
            Swal.fire('Warning', 'Please select an ingredient to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this ingredient!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`https://evahluk-restful-apis.onrender.com/api/ingredientsusage/delete/${id}`)
                    .then(response => {
                        console.log('Ingredient deleted successfully:', response.data);
                        fetchIngredientsData();
                        Swal.fire('Deleted!', 'Your ingredient has been deleted.', 'success');
                        setSelectedRows(null); // Deselect the item after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting ingredient:', error);
                        Swal.fire('Error', 'Failed to delete the selected ingredient', 'error');
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

        axios.put(`https://evahluk-restful-apis.onrender.com/api/ingredientsusage/update/${selectedRows.id}`, modalIngredient)
            .then(response => {
                console.log('Ingredient updated successfully:', response.data);
                fetchIngredientsData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Ingredient updated successfully!',
                });

                setOpen(false);
                setSelectedRows(null);
            })
            .catch(error => {
                console.error('Error updating ingredient:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update ingredient. Please try again later.',
                });
            });
    };

    const handleEdit = (row) => {
        setSelectedRows(row);
        setModalIngredient({
            ingredient_name: row.ingredient_name,
            quantity: row.quantity,
            unit: row.unit,
            price: row.price
        });
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewIngredient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        setModalIngredient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'ingredient_name', headerName: 'Ingredient Name', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
        { field: 'unit', headerName: 'Unit', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleEdit(params.row)}
                    style={{ marginLeft: 16 }}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            width: 120,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(params.row)}
                    style={{ marginLeft: 16 }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className={classes.container}>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Ingredients
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Ingredient Name</Typography>
                                <TextField
                                    id="ingredient-name"
                                    type="text"
                                    name="ingredient_name"
                                    value={newIngredient.ingredient_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                                <TextField
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    value={newIngredient.quantity}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Unit</Typography>
                                <TextField
                                    id="unit"
                                    type="text"
                                    name="unit"
                                    value={newIngredient.unit}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                                <TextField
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={newIngredient.price}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className="editButton" variant="contained" color="primary" onClick={handleCreateIngredient}>Create Ingredient</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <br />

            <div className={classes.container}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={ingredientsData}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.modalContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Ingredient Name</Typography>
                            <TextField
                                type="text"
                                name="ingredient_name"
                                value={modalIngredient.ingredient_name}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Quantity</Typography>
                            <TextField
                                type="number"
                                name="quantity"
                                value={modalIngredient.quantity}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Unit</Typography>
                            <TextField
                                type="text"
                                name="unit"
                                value={modalIngredient.unit}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                            <TextField
                                type="number"
                                name="price"
                                value={modalIngredient.price}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                className="editButton"
                                variant="contained"
                                color="primary"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </>
    );
};

export default ManageIngredients;
