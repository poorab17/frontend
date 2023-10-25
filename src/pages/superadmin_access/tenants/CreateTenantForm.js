import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../../../components/Notification';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    CssBaseline,
    TextField,
    Button,
} from '@mui/material';
import api from '../../../api';
function CreateTenantForm() {
    const navigate = useNavigate();
    const [tenantName, setTenantName] = useState('');
    const [tenantUsername, setTenantUsername] = useState('');
    const [tenantRole, setTenantRole] = useState('');
    const [tenantDescription, setTenantDescription] = useState('');
    const [tenantDb, setTenantDb] = useState('');
    const [tenantPassword, setTenantPassword] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const handleTenantCreate = () => {
        const data = {
            name: tenantName,
            username: tenantUsername,
            role: tenantRole,
            description: tenantDescription,
            databaseName: tenantDb,
            password: tenantPassword,
        };
        // Retrieve the JWT token from local storage when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            // Handle the case when the token is not found, e.g., redirect to login
            navigate('/login'); // Replace with your actual login route
            return;
        }
        // Log the token to the console for debugging
        console.log('Check Token:', jwtToken);
        // Make a POST request to the backend's /create route with the JWT token
        api.post('/api/tenants/create/', data)
            .then((response) => {
                console.log('Tenants created successfully:', response.data);
                setNotification({
                    open: true,
                    message: 'Tenanats created successfully',
                    severity: 'success',
                });
                navigate("/superadmin/tenants/");
            })
            .catch((error) => {
                console.error('Error creating Tenant:', error);
                setNotification({
                    open: true,
                    message: 'Error creating Tenant',
                    severity: 'error',
                });
            });
    };




    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    };
    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Create Tenant</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <form>
                    <TextField
                        label="Tenant Name"
                        fullWidth
                        margin="normal"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                    />
                    <TextField
                        label="Tenant Username"
                        fullWidth
                        margin="normal"
                        value={tenantUsername}
                        onChange={(e) => setTenantUsername(e.target.value)}
                    />
                    <TextField
                        label="Tenant Role"
                        fullWidth
                        margin="normal"
                        value={tenantRole}
                        onChange={(e) => setTenantRole(e.target.value)}
                    />
                    <TextField
                        label="Tenant Description"
                        fullWidth
                        margin="normal"
                        value={tenantDescription}
                        onChange={(e) => setTenantDescription(e.target.value)}
                    />
                    <TextField
                        label="Tenant dbUri"
                        fullWidth
                        margin="normal"
                        value={tenantDb}
                        onChange={(e) => setTenantDb(e.target.value)}
                    />
                    <TextField
                        label="Tenant Password"
                        fullWidth
                        margin="normal"
                        value={tenantPassword}
                        onChange={(e) => setTenantPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTenantCreate}
                    >
                        Create
                    </Button>
                </form>
            </Container>
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                handleClose={closeNotification}
            />
        </div>
    );
}
export default CreateTenantForm;