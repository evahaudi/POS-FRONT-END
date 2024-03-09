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

const ConfirmOrders = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [chefConfirmation, setChefConfirmation] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalData, setModalData] = useState({
        order_number: '',
        is_confirmed: false,
        is_completed: false,
    });

    useEffect(() => {
        fetchChefConfirmation();
    }, []);

    const fetchChefConfirmation = () => {
        axios.get('http://127.0.0.1:8000/api/chef-confirmation/get')
            .then(response => {
                setChefConfirmation(response.data);
            })
            .catch(error => {
                console.error('Error fetching chef confirmation:', error);
            });
    };

    const handleUpdateConfirmation = () => {
        if (!selectedRow) {
            console.error('Selected row not found.');
            return;
        }

        const updatedData = {
            ...selectedRow,
            ...modalData,
        };

        axios.put(`https://evahluk-restful-apis.onrender.com/api/chef-confirmation/update/${selectedRow.order_number}`, updatedData)
            .then(response => {
                console.log('Chef confirmation updated successfully:', response.data);
                fetchChefConfirmation(); // Refresh data
                setOpen(false);
                setSelectedRow(null);
                setModalData({
                    order_number: '',
                    is_confirmed: false,
                    is_completed: false,
                });
                Swal.fire('Success', 'Chef confirmation updated successfully', 'success');
            })
            .catch(error => {
                console.error('Error updating chef confirmation:', error);
                Swal.fire('Error', 'Failed to update chef confirmation', 'error');
            });
    };

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'order_number', headerName: 'Order Number', width: 150 },
        { field: 'is_confirmed', headerName: 'Confirmed', width: 130 },
        { field: 'is_completed', headerName: 'Completed', width: 130 },
    ];

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
        setModalData({
            order_number: params.row.order_number,
            is_confirmed: params.row.is_confirmed,
            is_completed: params.row.is_completed,
        });
    };

    return (
        <div className={classes.container}>
            <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                Confirm Orders
            </Typography>
            <div className={classes.dataGrid}>
                <DataGrid
                    rows={chefConfirmation}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    onRowClick={handleRowClick}
                />
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
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
                        <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                            Update Confirmation
                        </Typography>
                        <TextField
                            id="order-number"
                            label="Order Number"
                            variant="outlined"
                            margin="normal"
                            name="order_number"
                            value={modalData.order_number}
                            InputLabelProps={{ style: { color: 'black' } }}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                        <TextField
                            id="is-confirmed"
                            label="Confirmed"
                            variant="outlined"
                            margin="normal"
                            name="is_confirmed"
                            value={modalData.is_confirmed}
                            onChange={(e) => setModalData({ ...modalData, is_confirmed: e.target.value })}
                            InputLabelProps={{ style: { color: 'black' } }}
                            fullWidth
                        />
                        <TextField
                            id="is-completed"
                            label="Completed"
                            variant="outlined"
                            margin="normal"
                            name="is_completed"
                            value={modalData.is_completed}
                            onChange={(e) => setModalData({ ...modalData, is_completed: e.target.value })}
                            InputLabelProps={{ style: { color: 'black' } }}
                            fullWidth
                        />
                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdateConfirmation}
                                style={{ marginRight: 10 }}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Modal>
        </div>
    );
};

export default ConfirmOrders;
