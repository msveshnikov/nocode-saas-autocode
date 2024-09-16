import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const ApiIntegration = () => {
    const [apis, setApis] = useState([]);
    const [newApi, setNewApi] = useState({
        name: '',
        endpoint: '',
        method: 'GET'
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchApis();
    }, []);

    const fetchApis = async () => {
        try {
            const response = await fetch('/api/integrations', {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setApis(data);
            } else {
                console.error('Failed to fetch APIs');
            }
        } catch (error) {
            console.error('Error fetching APIs:', error);
        }
    };

    const handleInputChange = e => {
        setNewApi({ ...newApi, [e.target.name]: e.target.value });
    };

    const handleAddApi = async () => {
        try {
            const response = await fetch('/api/integrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`
                },
                body: JSON.stringify(newApi)
            });
            if (response.ok) {
                setApis([...apis, newApi]);
                setNewApi({ name: '', endpoint: '', method: 'GET' });
                setOpenDialog(false);
            } else {
                console.error('Failed to add API');
            }
        } catch (error) {
            console.error('Error adding API:', error);
        }
    };

    const handleEditApi = index => {
        setEditingIndex(index);
        setNewApi(apis[index]);
        setOpenDialog(true);
    };

    const handleUpdateApi = async () => {
        try {
            const response = await fetch(`/api/integrations/${apis[editingIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`
                },
                body: JSON.stringify(newApi)
            });
            if (response.ok) {
                const updatedApis = [...apis];
                updatedApis[editingIndex] = newApi;
                setApis(updatedApis);
                setNewApi({ name: '', endpoint: '', method: 'GET' });
                setOpenDialog(false);
                setEditingIndex(null);
            } else {
                console.error('Failed to update API');
            }
        } catch (error) {
            console.error('Error updating API:', error);
        }
    };

    const handleDeleteApi = async index => {
        try {
            const response = await fetch(`/api/integrations/${apis[index].id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            if (response.ok) {
                const updatedApis = apis.filter((_, i) => i !== index);
                setApis(updatedApis);
            } else {
                console.error('Failed to delete API');
            }
        } catch (error) {
            console.error('Error deleting API:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                API Integration
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                >
                    Add New API
                </Button>
            </Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        {apis.map((api, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => handleEditApi(index)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteApi(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={api.name}
                                    secondary={`${api.method} ${api.endpoint}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editingIndex !== null ? 'Edit API' : 'Add New API'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="API Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newApi.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="endpoint"
                        label="API Endpoint"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newApi.endpoint}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="method"
                        label="HTTP Method"
                        select
                        fullWidth
                        variant="outlined"
                        value={newApi.method}
                        onChange={handleInputChange}
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={editingIndex !== null ? handleUpdateApi : handleAddApi}>
                        {editingIndex !== null ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ApiIntegration;
