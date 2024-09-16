import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Grid,
    Paper,
    Divider,
    Snackbar
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [settings, setSettings] = useState({
        username: '',
        email: '',
        notifications: true,
        darkMode: false,
        language: 'en'
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    useEffect(() => {
        if (user) {
            setSettings({
                ...settings,
                username: user.username,
                email: user.email
            });
        }
    }, [user]);

    const handleChange = event => {
        const { name, value, checked } = event.target;
        setSettings({
            ...settings,
            [name]: name === 'notifications' || name === 'darkMode' ? checked : value
        });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await updateUser(settings);
            setSnackbar({ open: true, message: 'Settings updated successfully' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to update settings' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Settings
                </Typography>
                <Paper elevation={3}>
                    <Box p={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={settings.username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications}
                                                onChange={handleChange}
                                                name="notifications"
                                                color="primary"
                                            />
                                        }
                                        label="Enable Notifications"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.darkMode}
                                                onChange={handleChange}
                                                name="darkMode"
                                                color="primary"
                                            />
                                        }
                                        label="Dark Mode"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Language"
                                        name="language"
                                        value={settings.language}
                                        onChange={handleChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Save Settings
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </Container>
    );
};

export default Settings;
