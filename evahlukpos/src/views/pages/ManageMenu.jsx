import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TextField, Button, Box, Modal, useTheme } from '@material-ui/core'
import { Typography, Grid, Card, CardContent, CardMedia, CardActions, CardActionArea, CardHeader } from '@mui/material';
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
    card: {
        marginBottom: theme.spacing(2),

    },
    image: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(15),
            height: theme.spacing(15),
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

const ManageMenu = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [menuData, setMenuData] = useState([]);
    const [modalMenu, setModalMenu] = useState({
        menuitem_name: '',
        is_vegetarian: false,
        description: '',
        is_available: true,
        image: '',
        category: '',
        price: '',
    });
    const [newMenu, setNewMenu] = useState({
        menuitem_name: '',
        is_vegetarian: false,
        description: '',
        is_available: true,
        image: '',
        category: '',
        price: '',
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchMenuData();
    }, []);

    const fetchMenuData = () => {
        axios.get('https://evahluk-restful-apis.onrender.com/api/menu/getall/')
            .then(response => {
                setMenuData(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
            });
    };
    console.log("menus:", menuData)


    const handleCreateMenu = () => {
        const { menuitem_name, is_vegetarian, description, is_available, image, category, price } = newMenu;
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

        const url = `https://evahluk-restful-apis.onrender.com/api/menu/create`;

        axios.post(url, {
            menuitem_name,
            is_vegetarian,
            description,
            is_available,
            image,
            category,
            price
        }, config)
            .then(response => {
                console.log('Menu item created successfully:', response.data);
                fetchMenuData();
                Swal.fire('Success', 'Menu item created successfully', 'success');
                setNewMenu({
                    menuitem_name: '',
                    is_vegetarian: false,
                    description: '',
                    is_available: true,
                    image: '',
                    category: '',
                    price: '',
                });
            })
            .catch(error => {
                console.error('Error creating menu item:', error);
                Swal.fire('Error', 'Failed to create menu item', 'error');
            });
    };

    const handleDelete = (cardId) => {

        const id = cardId;
        console.log('Card ID:', cardId);

        if (!cardId) {
            Swal.fire('Warning', 'Please select an item to delete', 'warning');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this menu item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`https://evahluk-restful-apis.onrender.com/api/menu/delete/?id=${id}`)
                    .then(response => {
                        console.log('Menu item deleted successfully:', response.data);
                        fetchMenuData();
                        Swal.fire('Deleted!', 'Your menu item has been deleted.', 'success');

                    })
                    .catch(error => {
                        console.error('Error deleting menu item:', error);
                        Swal.fire('Error', 'Failed to delete the selected menu item', 'error');
                    });
            }
        });
    };

    const handleSaveChanges = (cardId) => {


        if (!cardId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a menu to update.',
            });
            return;
        }

        // Merge selectedRows and modalMenu objects
        const updatedFields = { ...modalMenu };

        // Remove the 'id' field from the merged object
        delete updatedFields.id;

        const id = cardId;
        console.log('Card ID:', cardId);
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

        axios.put(`https://evahluk-restful-apis.onrender.com/api/menu/update//id=${id}`, updatedFields, config)
            .then(response => {
                console.log('Menu item updated successfully:', response.data);
                fetchMenuData(); // Refresh data
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Menu item updated successfully!',
                });

                setOpen(false);

            })
            .catch(error => {
                console.error('Error updating menu item:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update menu item. Please try again later.',
                });
            });
    };


    const handleEdit = (cardId) => {
        const selectedCard = menuData.find(menu => menu.id === cardId);
        if (selectedCard) {
            setModalMenu({
                menuitem_name: selectedCard.menuitem_name,
                is_vegetarian: selectedCard.is_vegetarian,
                description: selectedCard.description,
                is_available: selectedCard.is_available,
                image: selectedCard.image,
                category: selectedCard.category,
                price: selectedCard.price,
            });
            setOpen(true);
        }
    };


    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMenu(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalInputChange = (event) => {
        const { name, value } = event.target;
        setModalMenu(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <>
            <div className={classes.container}>
                <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>
                    Manage Menu
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Name</Typography>
                                <TextField
                                    type="text"
                                    name="menuitem_name"
                                    value={newMenu.menuitem_name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Is Vegetarian</Typography>
                                <TextField
                                    type="text"
                                    name="is_vegetarian"
                                    value={newMenu.is_vegetarian}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Description</Typography>
                                <TextField
                                    type="text"
                                    name="description"
                                    value={newMenu.description}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Is Available</Typography>
                                <TextField
                                    type="text"
                                    name="is_available"
                                    value={newMenu.is_available}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Image</Typography>
                                <TextField
                                    type="text"
                                    name="image"
                                    value={newMenu.image}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Category</Typography>
                                <TextField
                                    type="text"
                                    name="category"
                                    value={newMenu.category}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                                <TextField
                                    type="text"
                                    name="price"
                                    value={newMenu.price}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" onClick={handleCreateMenu}>Create</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <br />
            {menuData.map(menu => (
                <Grid container spacing={2} justifyContent="center" alignItems="center" direction={isSmallScreen ? "column" : "row"}>
                    <Grid item xs={12} sm={4}>
                        <Card key={menu.id} className={classes.card} >
                            <CardContent>

                                <Typography variant="h2" color='green' fontFamily='Verdana'>{menu.menuitem_name}</Typography>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    className={classes.image}
                                    src={menu.image}
                                    alt="menu"
                                />
                                <Typography variant='h5' color='green' fontFamily='Verdana' fontStyle='italic'>Description:</Typography>
                                <Typography variant="body1"  >{menu.description}</Typography>
                                <Typography variant='h5' color='green' fontFamily='Verdana' fontStyle='italic'>Category:</Typography>
                                <Typography variant="body1">{menu.category}</Typography>
                                <Typography variant='h5' color='green' fontFamily='Verdana' fontStyle='italic'>Price:</Typography>
                                <Typography variant="body1">Ksh.{menu.price}</Typography>
                                {/* <Typography variant='h5' color='green' fontFamily='Verdana' fontStyle='italic'>Vegetarian:</Typography>
                                <Typography variant="body1">{menu.is_vegetarian}</Typography>
                                <Typography variant='h5' color='green' fontFamily='Verdana' fontStyle='italic'>Available:</Typography>
                               <Typography variant="body1">{menu.is_available}</Typography> */}
                                <CardActionArea>
                                    <CardActions>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(menu.id)}>Edit</Button>
                                        <br />
                                        <Button variant="contained" style={{ marginLeft: '10px' }} color="secondary" onClick={() => handleDelete(menu)}>Delete</Button>
                                    </CardActions>
                                </CardActionArea>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            ))}
            <br />
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
                        <Typography variant="h5" align="center" style={{ color: 'green' }} gutterBottom>Edit Menu Item</Typography>

                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Name</Typography>
                                    <TextField
                                        type="text"
                                        name="menuitem_name"
                                        value={modalMenu.menuitem_name}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Is Vegetarian</Typography>
                                    <TextField
                                        type="text"
                                        name="is_vegetarian"
                                        value={modalMenu.is_vegetarian}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Description</Typography>
                                    <TextField
                                        type="text"
                                        name="description"
                                        value={modalMenu.description}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Is Available</Typography>
                                    <TextField
                                        type="text"
                                        name="is_available"
                                        value={modalMenu.is_available}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Image</Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        className={classes.image}
                                        onChange={handleModalInputChange}
                                        src={modalMenu.image}
                                        alt="menu"
                                    />
                                    <TextField
                                        
                                        name="image"
                                        value={modalMenu.image}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="upload-image"
                                        type="file"
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Category</Typography>
                                    <TextField
                                        type="text"
                                        name="category"
                                        value={modalMenu.category}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" color="textPrimary">Price</Typography>
                                    <TextField
                                        type="text"
                                        name="price"
                                        value={modalMenu.price}
                                        onChange={handleModalInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </>

                        <br />
                        <Button
                            onClick={() => handleSaveChanges(modalMenu.id)}
                            variant="contained"
                            color="primary"
                        >
                            Save
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
                </div>
            </Modal>

        </>
    );
}

export default ManageMenu;
