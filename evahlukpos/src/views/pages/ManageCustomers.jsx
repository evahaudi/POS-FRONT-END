import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Modal, TextField, Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCustomers = () => {
    const [customersData, setCustomersData] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        customer_name: '',
        amount: '',
        payment_method: '',
        balance: '',
        debt: '',
        phone: '',
        email: '',
        location: '',
        gender: '',
    });
    const [modalCustomer, setModalCustomer] = useState({
        customer_name: '',
        amount: '',
        payment_method: '',
        balance: '',
        debt: '',
        phone: '',
        email: '',
        location: '',
        gender: '',
    });
    const [selectedRows, setSelectedRows] = useState(null);
    const [open, setOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        fetchCustomersData();
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 600);
    };

    const fetchCustomersData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/Customers/getall/')
            .then(response => {
                setCustomersData(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    };

    const handleCreateCustomer = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('https://evahluk-restful-apis.onrender.com/api/Customers/create/', newCustomer, config)
            .then(response => {
                console.log('Customer created successfully:', response.data);
                fetchCustomersData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Customer created successfully!',
                });
                setNewCustomer({
                    customer_name: '',
                    amount: '',
                    payment_method: '',
                    balance: '',
                    debt: '',
                    phone: '',
                    email: '',
                    location: '',
                    gender: '',
                });
            })
            .catch(error => {
                console.error('Error creating customer:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to create customer. Please try again later.',
                });
            });
    };

    const handleEdit = (row) => {
        setSelectedRows(row);
        setModalCustomer({
            customer_name: row.customer_name,
            amount: row.amount,
            payment_method: row.payment_method,
            balance: row.balance,
            debt: row.debt,
            phone: row.phone,
            email: row.email,
            location: row.location,
            gender: row.gender,
        });
        setOpen(true);
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

        const id = selectedRows.id;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.put(`https://evahluk-restful-apis.onrender.com/api/Customers/update/${id}/`, modalCustomer, config)
            .then(response => {
                console.log('Customer updated successfully:', response.data);
                fetchCustomersData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Customer updated successfully!',
                });
                setOpen(false);
                setSelectedRows(null);
            })
            .catch(error => {
                console.error('Error updating customer:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update customer. Please try again later.',
                });
            });
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        setModalCustomer(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'customer_name', headerName: 'Customer Name' },
        { field: 'amount', headerName: 'Amount' },
        { field: 'payment_method', headerName: 'Payment Method' },
        { field: 'balance', headerName: 'Balance' },
        { field: 'debt', headerName: 'Debt' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'email', headerName: 'Email' },
        { field: 'location', headerName: 'Location' },
        { field: 'gender', headerName: 'Gender' },
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
    ];

    return (
        <>
            <div>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Customers
                </Typography>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="customer-name"
                                    type="text"
                                    name="customer_name"
                                    label="Customer Name"
                                    value={newCustomer.customer_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    label="Amount"
                                    value={newCustomer.amount}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="payment-method"
                                    select
                                    name="payment_method"
                                    label="Payment Method"
                                    value={newCustomer.payment_method}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="bank">Bank</option>
                                    <option value="mpesa">Mpesa</option>
                                    <option value="cash">Cash</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="balance"
                                    type="number"
                                    name="balance"
                                    label="Balance"
                                    value={newCustomer.balance}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="debt"
                                    type="number"
                                    name="debt"
                                    label="Debt"
                                    value={newCustomer.debt}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    label="Phone"
                                    value={newCustomer.phone}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    value={newCustomer.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="location"
                                    type="text"
                                    name="location"
                                    label="Location"
                                    value={newCustomer.location}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="gender"
                                    type="text"
                                    name="gender"
                                    label="Gender"
                                    value={newCustomer.gender}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateCustomer}
                                >
                                    Create Customer
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Box mt={2}>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={customersData}
                            columns={columns}
                            pageSize={10}
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
                    <div>
                        <Typography variant="h6">Edit Customer</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-customer-name"
                                    type="text"
                                    name="customer_name"
                                    label="Customer Name"
                                    value={modalCustomer.customer_name}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-amount"
                                    type="number"
                                    name="amount"
                                    label="Amount"
                                    value={modalCustomer.amount}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-payment-method"
                                    select
                                    name="payment_method"
                                    label="Payment Method"
                                    value={modalCustomer.payment_method}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="bank">Bank</option>
                                    <option value="mpesa">Mpesa</option>
                                    <option value="cash">Cash</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-balance"
                                    type="number"
                                    name="balance"
                                    label="Balance"
                                    value={modalCustomer.balance}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-debt"
                                    type="number"
                                    name="debt"
                                    label="Debt"
                                    value={modalCustomer.debt}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-phone"
                                    type="text"
                                    name="phone"
                                    label="Phone"
                                    value={modalCustomer.phone}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-email"
                                    type="email"
                                    name="email"
                                    label="Email"
                                    value={modalCustomer.email}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-location"
                                    type="text"
                                    name="location"
                                    label="Location"
                                    value={modalCustomer.location}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="modal-gender"
                                    type="text"
                                    name="gender"
                                    label="Gender"
                                    value={modalCustomer.gender}
                                    onChange={handleModalInputChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button
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
            </div>
        </>
    );
};

export default ManageCustomers;
