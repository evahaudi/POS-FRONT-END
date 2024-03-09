import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Card, Grid, CardContent, Typography, TextField, Button, Box, Modal, useTheme } from '@material-ui/core';
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
        maxWidth: 500,
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
            fontSize: 20,
            [theme.breakpoints.down('sm')]: {
                fontSize: 5,
            },
        },
        '& .MuiDataGrid-row:nth-child(even)': {
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

const ManageStaff = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [staffData, setStaffData] = useState([]);
    const [selectedRows, setSelectedRows] = useState(null);
    const [modalStaff, setModalStaff] = useState({
        username: '',
        email: '',
        fullname: '',
        birthdate: '',
        location: '',
        experienceyears: '',
        phone: '',
        department: '',
        password: '',
        password2: '',
        role: '',
        user_image: '',
        gender:'',
        is_active: false,
    });
    const [newStaff, setNewStaff] = useState({
        username: '',
        email: '',
        fullname: '',
        birthdate: '',
        gender:"",
        location: '',
        experienceyears: '',
        phone: '',
        department: '',
        password: '',
        password2: '',
        role: '',
        user_image: '',
        is_active: false,
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchStaffData();
    }, []);

    const fetchStaffData = () => {
        axios.get('http://127.0.0.1:8000/api/waiters/get')
            .then(response => {
                setStaffData(response.data);
            })
            .catch(error => {
                console.error('Error fetching staff data:', error);
            });
    };

    const handleCreateStaff = () => {
        const { username, gender, email, is_active, fullname, birthdate, location, experienceyears, phone, department, password, password2, role, user_image } = newStaff;

        console.log("submitted data:", newStaff)
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('User token not found.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        }

        const url = `http://127.0.0.1:8000/api/waiters/create/?username=${username}&email=${email}&gender=${gender}&fullname=${fullname}&birthdate=${birthdate}&location=${location}&experienceyears=${experienceyears}&phone=${phone}&department=${department}&password=${password}&password2=${password2}&role=${role}&user_image=${user_image}&is_active=${is_active}`
        axios.post(url, {}, config)
            .then(response => {
                console.log('Staff created successfully:', response.data);
                fetchStaffData();
                Swal.fire('Success', 'Staff created successfully', 'success');
                setNewStaff({
                    username: '',
                    email: '',
                    fullname: '',
                    birthdate: '',
                    gender:'',
                    location: '',
                    experienceyears: '',
                    phone: '',
                    department: '',
                    password: '',
                    password2: '',
                    role: '',
                    user_image: '',
                    is_active: false,
                });
            })
            .catch(error => {
                console.error('Error creating staff:', error);
                Swal.fire('Error', 'Failed to create staff', 'error');
            });
    };

    const handleDelete = (row) => {
        setSelectedRows(row);
        console.log('Row data:', row); // Check the contents of the row object
        const id = row.id;

        if (!selectedRows) {
            Swal.fire('Warning', 'Please select a staff member to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this staff member!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/waiters/delete/?id=${id}`)
                    .then(response => {
                        console.log('Staff member deleted successfully:', response.data);
                        fetchStaffData();
                        Swal.fire('Deleted!', 'Your staff member has been deleted.', 'success');
                        setSelectedRows(null); // Deselect the item after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting staff member:', error);
                        Swal.fire('Error', 'Failed to delete the selected staff member', 'error');
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
        const updatedFields = { ...selectedRows, ...modalStaff };

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
        const updatePromise = axios.put(`http://127.0.0.1:8000/api/waiters/update/?id=${selectedRows.id}`, updatedFieldsObj);

        updatePromise.then(response => {
            console.log('Staff member updated successfully:', response.data);
            fetchStaffData(); // Refresh data
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Staff member updated successfully!',
            });

            setOpen(false);
            setSelectedRows(null);
        }).catch(error => {
            console.error('Error updating staff member:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update staff member. Please try again later.',
            });
        });
    };

    const columns = [
        { field: 'id', headerName: 'Id' },
        { field: 'username', headerName: 'Username' },
        { field: 'email', headerName: 'Email' },
        { field: 'fullname', headerName: 'Name' },
        { field: 'birthdate', headerName: 'Birthdate' },
        { field: 'location', headerName: 'Location' },
        { field: 'experienceyears', headerName: 'Expnce yrs' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'department', headerName: 'Deprtmnt' },
        { field: 'role', headerName: 'Role' },
        { field: 'is_active', headerName: 'Active', type: 'boolean' },
        { field: 'user_image', headerName: 'image' },
        { field: 'password', headerName: 'pwd' },

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
                    color="secondary"
                    onClick={() => handleDelete(params.row)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const handleEdit = (row) => {
        setSelectedRows(row);
        setModalStaff({
            username: row.username,
            email: row.email,
            fullname: row.fullname,
            birthdate: row.birthdate,
            location: row.location,
            experienceyears: row.experienceyears,
            phone: row.phone,
            department: row.department,
            role: row.role,
            is_active: row.is_active,
            user_image: row.user_image,
            password: row.password

        });
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStaff(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Updating ${name} to ${value}`);
        setModalStaff(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <div className={classes.container}>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Staff
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Username</Typography>
                                <TextField
                                    type="text"
                                    name="username"
                                    value={newStaff.username}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Email</Typography>
                                <TextField
                                    type="email"
                                    name="email"
                                    value={newStaff.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Full Name</Typography>
                                <TextField
                                    type="text"
                                    name="fullname"
                                    value={newStaff.fullname}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Birthdate</Typography>
                                <TextField
                                    type="date"
                                    name="birthdate"
                                    value={newStaff.birthdate}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Location</Typography>
                                <TextField
                                    type="text"
                                    name="location"
                                    value={newStaff.location}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Experience (Years)</Typography>
                                <TextField
                                    type="text"
                                    name="experienceyears"
                                    value={newStaff.experienceyears}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Phone</Typography>
                                <TextField
                                    type="text"
                                    name="phone"
                                    value={newStaff.phone}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Department</Typography>
                                <TextField
                                    type="text"
                                    name="department"
                                    value={newStaff.department}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Role</Typography>
                                <TextField
                                    type="text"
                                    name="role"
                                    value={newStaff.role}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Is Active</Typography>
                                <TextField
                                    type="text"
                                    name="is_active"
                                    value={newStaff.is_active}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Password</Typography>
                                <TextField
                                    type="password"
                                    name="password"
                                    value={newStaff.password}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Profile Image</Typography>
                                <TextField
                                    type="file"
                                    accept="image/*"
                                    name="user_image"
                                    value={newStaff.user_image}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Confirm Password</Typography>
                                <TextField
                                    type="password"
                                    name="password2"
                                    value={newStaff.password2}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="gender"
                                    select
                                    name="gender"
                                    value={newStaff.gender}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    className="editButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateStaff}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <br />
            <div className={classes.container}>
                <div className={classes.dataGrid}>
                    <DataGrid
                        className={classes.dataGrid}
                        rows={staffData}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />


                    <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className={classes.modalContainer}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 500,
                                    bgcolor: 'background.paper',
                                    border: '2px solid #000',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>Update Staff Details</Typography>
                                {selectedRows && (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Username</Typography>
                                                <TextField
                                                    type="text"
                                                    name="username"
                                                    value={modalStaff.username}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Email</Typography>
                                                <TextField
                                                    type="text"
                                                    name="email"
                                                    value={modalStaff.email}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Profile Image</Typography>
                                                <TextField
                                                    type="image"                  
                                                    name="user_image"
                                                    accept="image/*"
                                                    value={modalStaff.user_image}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                    InputLabelProps={{ style: { color: 'black' } }}
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Full Name</Typography>
                                                <TextField
                                                    type="text"
                                                    name="fullname"
                                                    value={modalStaff.fullname}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Birthdate</Typography>
                                                <TextField
                                                    type="date"
                                                    name="birthdate"
                                                    value={modalStaff.birthdate}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Location</Typography>
                                                <TextField
                                                    type="text"
                                                    name="location"
                                                    value={modalStaff.location}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Experience (Years)</Typography>
                                                <TextField
                                                    type="text"
                                                    name="experienceyears"
                                                    value={modalStaff.experienceyears}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Phone</Typography>
                                                <TextField
                                                    type="text"
                                                    name="phone"
                                                    value={modalStaff.phone}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Department</Typography>
                                                <TextField
                                                    type="text"
                                                    name="department"
                                                    value={modalStaff.department}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Role</Typography>
                                                <TextField
                                                    type="text"
                                                    name="role"
                                                    value={modalStaff.role}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Is Active</Typography>
                                                <TextField
                                                    type="text"
                                                    name="is_active"
                                                    value={modalStaff.is_active}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="gender"
                                                    select
                                                    name="gender"
                                                    label="gender"
                                                    value={modalStaff.gender}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    <option value=""></option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>

                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle1" color="textPrimary">Password</Typography>
                                                <TextField
                                                    type="password"
                                                    name="passsword"
                                                    value={modalStaff.password}
                                                    onChange={handleModalInputChange}
                                                    variant="outlined"
                                                    InputLabelProps={{ style: { color: 'black' } }}
                                                    inputProps={{ style: { fontSize: isSmallScreen ? '12px' : '16px' } }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                <br />

                                <Button
                                    className="editButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveChanges}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="editButton"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCloseModal}
                                    style={{ marginLeft: '10px' }}
                                >
                                    cancel
                                </Button>
                            </Box>
                        </div>
                    </Modal>
                </div >

            </div>
        </>



    );
};

export default ManageStaff;
