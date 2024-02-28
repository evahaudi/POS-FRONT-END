import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, useTheme ,Typography,Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor:"white",
    minHeight: '300px',
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
      [theme.breakpoints.down('sm')]: {
        fontSize: 9,
        paddingLeft: theme.spacing(1), // Adjust padding for smaller screens
        paddingRight: theme.spacing(1), // Adjust padding for smaller screens
        whiteSpace: 'normal', // Allow text wrapping
        overflow: 'hidden', // Hide overflowing text
        textOverflow: 'ellipsis', // Display ellipsis for long text
        minWidth: '100px', // Set a minimum width for the column headers
       
       
        
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

const ManageSales = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState(0);

  const rows = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', },
    { field: 'name', headerName: 'Name'},
    { field: 'age', headerName: 'Age' },
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
  ];

  const handleEdit = (row) => {
    setSelectedRow(row);
    setEditedName(row.name);
    setEditedAge(row.age);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    const updatedRow = { ...selectedRow, name: editedName, age: editedAge };
    console.log('Updated row:', updatedRow);
    // Perform any further actions like updating the backend or refreshing the data
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.dataGrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          
          disableSelectionOnClick
          getRowHeight={() => 'auto'}
        />
      </div>
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
          <Typography id="modal-title">Edit Row</Typography>
          {selectedRow && (
            <>
              <Input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <Input
                type="number"
                value={editedAge}
                onChange={(e) => setEditedAge(parseInt(e.target.value))}
              />
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
  );
};

export default ManageSales;
