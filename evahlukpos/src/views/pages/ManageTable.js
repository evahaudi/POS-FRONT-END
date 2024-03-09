import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Card, Grid, CardContent, Typography, TextField, Button, Box, Modal } from '@material-ui/core';
import Swal from 'sweetalert2';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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

const ManageTable = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);
    const [modalTable, setModalTable] = useState({
        capacity: '',
        table_number: '',
        location: '',
    });
    const [newTable, setNewTable] = useState({
        capacity: '',
        table_number: '',
        location: '',
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTableData();
    }, []);

    const fetchTableData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/table/get')
            .then(response => {
                setTableData(response.data);
            })
            .catch(error => {
                console.error('Error fetching table data:', error);
            });
    };

    const handleCreateTable = () => {
        const { capacity, table_number, location } = newTable;

        axios.post('https://evahluk-restful-apis.onrender.com/api/table/create', {
            capacity,
            table_number,
            location
        })
            .then(response => {
                console.log('Table created successfully:', response.data);
                fetchTableData();
                Swal.fire('Success', 'Table created successfully', 'success');
                setNewTable({
                    capacity: '',
                    table_number: '',
                    location: '',
                });
            })
            .catch(error => {
                console.error('Error creating table:', error);
                Swal.fire('Error', 'Failed to create table', 'error');
            });
    };

    const handleDelete = (row) => {
        setSelectedRows(row);
        const id = row.id;

        if (!selectedRows) {
            Swal.fire('Warning', 'Please select a table to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this table!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`https://evahluk-restful-apis.onrender.com/api/table/delete/${id}`)
                    .then(response => {
                        console.log('Table deleted successfully:', response.data);
                        fetchTableData();
                        Swal.fire('Deleted!', 'Your table has been deleted.', 'success');
                        setSelectedRows(null); // Deselect the item after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting table:', error);
                        Swal.fire('Error', 'Failed to delete the selected table', 'error');
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

        axios.put(`https://evahluk-restful-apis.onrender.com/api/table/update/${selectedRows.id}`, modalTable)
            .then(response => {
                console.log('Table updated successfully:', response.data);
                fetchTableData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Table updated successfully!',
                });

                setOpen(false);
                setSelectedRows(null);
            })
            .catch(error => {
                console.error('Error updating table:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update table. Please try again later.',
                });
            });
    };

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'capacity', headerName: 'Capacity' },
        { field: 'table_number', headerName: 'Table Number' },
        { field: 'location', headerName: 'Location' },
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
                    Edit
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
        setModalTable({
            capacity: row.capacity,
            table_number: row.table_number,
            location: row.location,
        });
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTable(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        setModalTable(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div className={classes.container}>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Tables
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Capacity</Typography>
                                <TextField
                                    id="capacity"
                                    type="number"
                                    name="capacity"
                                    value={newTable.capacity}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Table Number</Typography>
                                <TextField
                                    id="table-number"
                                    type="number"
                                    name="table_number"
                                    value={newTable.table_number}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Location</Typography>
                                <TextField
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={newTable.location}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className="editButton" variant="contained" color="primary" onClick={handleCreateTable}>Create Table</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <br />

            <div className={classes.container}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={tableData}
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
                            <Typography variant="subtitle1" color="textPrimary">Capacity</Typography>
                            <TextField
                                type="number"
                                name="capacity"
                                value={modalTable.capacity}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Table Number</Typography>
                            <TextField
                                type="number"
                                name="table_number"
                                value={modalTable.table_number}
                                onChange={handleModalInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" color="textPrimary">Location</Typography>
                            <TextField
                                type="text"
                                name="location"
                                value={modalTable.location}
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

export default ManageTable;
