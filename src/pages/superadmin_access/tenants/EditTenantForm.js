import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for getting the module ID from the URL
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
import { Link } from 'react-router-dom';
function EditTenantForm() {
    const { tenantId } = useParams(); // Get the module ID from the URL
    const navigate = useNavigate();
    const [tenantName, setTenantName] = useState('');
    const [tenantUsername, setTenantUsername] = useState('');
    const [tenantRole, setTenantRole] = useState('');
    const [tenantDescription, setTenantDescription] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    useEffect(() => {
        // Retrieve the tenant data when the component mounts
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            // Handle the case when the token is not found, e.g., redirect to login
            navigate('/login'); // Replace with your actual login route
            return;
        }
        api.get(`/api/tenants/${tenantId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => {
                const tenantData = response.data;
                if (tenantData) {
                    setTenantName(tenantData.name);
                    setTenantUsername(tenantData.username);
                    setTenantRole(tenantData.role);
                    setTenantDescription(tenantData.description);
                } else {
                    setNotification({
                        open: true,
                        message: 'Tenant not found or empty data',
                        severity: 'error',
                    });
                }
                setTenantName(tenantData.name);
                setTenantUsername(tenantData.username);
                setTenantRole(tenantData.role);
                setTenantDescription(tenantData.description);
            })
            .catch((error) => {
                console.error('Error fetching tenant data:', error);
                setNotification({
                    open: true,
                    message: 'Error fetching tenant data',
                    severity: 'error',
                });
            });
    }, [tenantId, navigate]);
    const handleTenantEdit = () => {
        const data = {
            name: tenantName,
            username: tenantUsername,
            role: tenantRole,
            description: tenantDescription,
        };
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/login'); // Replace with your actual login route
            return;
        }
        api.put(`/api/tenants/${tenantId}`, data)
            .then((response) => {
                console.log('Tenant edited successfully:', response.data);
                setNotification({
                    open: true,
                    message: 'Tenant edited successfully',
                    severity: 'success',
                });
                navigate(`/superadmin/tenants`);
            })
            .catch((error) => {
                console.error('Error editing tenant:', error);
                setNotification({
                    open: true,
                    message: 'Error editing tenant',
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
                    <Typography variant="h6">Edit Tenant</Typography>
                </Toolbar>
            </AppBar>
            <Button
                component={Link} // Use RouterLink from react-router-dom
                to="/superadmin/tenants"
                variant="outlined"
                color="primary"
                style={{ marginTop: '5px' }}
            >
                Back
            </Button>
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
                        label="Tenant role"
                        fullWidth
                        margin="normal"
                        value={tenantRole}
                        onChange={(e) => setTenantRole(e.target.value)}
                    />
                    <TextField
                        label="Tenant description"
                        fullWidth
                        margin="normal"
                        value={tenantDescription}
                        onChange={(e) => setTenantDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTenantEdit}
                    >
                        Save Changes
                    </Button>
                </form>
            </Container>
        </div>
    );
}
export default EditTenantForm;