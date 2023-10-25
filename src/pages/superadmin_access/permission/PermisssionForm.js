
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, Button, Checkbox, ListItemText } from '@mui/material';

function PermissionForm() {
    const navigate = useNavigate();
    const [moduleName, setModuleName] = useState([]);
    const [tenantName, setTenantName] = useState('');
    const [rbac, setRbac] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        // Fetch the list of tenants from your backend
        api.get('/api/tenants/').then((response) => {
            setTenants(response.data);
        });

        // Fetch the list of modules from your backend
        api.get('/api/modules/').then((response) => {
            setModules(response.data);
        });
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Create the permission object to send to the backend
        const permissionData = {
            moduleName,
            tenantName,
            rbac,
        };

        // Send the permission data to your backend to create the permission
        api.post('/api/modules/permission/create', permissionData).then((response) => {
            console.log('Permission created:', response.data);
            // Clear form or handle other UI updates
        });

        navigate("/superadmin/permission/details");
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5">Create Permission</Typography>
            <Box component="form" onSubmit={handleFormSubmit}>
                <FormControl sx={{ mt: 2, width: '100%' }}>
                    <InputLabel>Select Tenant</InputLabel>
                    <Select value={tenantName} onChange={(e) => setTenantName(e.target.value)} label="Select Tenant" fullWidth>
                        <MenuItem value="">Select Tenant</MenuItem>
                        {tenants.map((tenant) => (
                            <MenuItem key={tenant._id} value={tenant.name}>
                                {tenant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, width: '100%' }}>
                    <InputLabel>Select Module(s)</InputLabel>
                    <Select
                        multiple
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        label="Select Module(s)"
                        fullWidth
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {modules.map((module) => (
                            <MenuItem key={module._id} value={module.name}>
                                <Checkbox checked={moduleName.indexOf(module.name) > -1} />
                                <ListItemText primary={module.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ mt: 2, width: '100%' }}>
                    <InputLabel>Select RBAC</InputLabel>
                    <Select
                        multiple
                        value={rbac}
                        onChange={(e) => setRbac(e.target.value)}
                        label="Select RBAC"
                        fullWidth
                        renderValue={(selected) => selected.join(', ')}
                    >
                        <MenuItem value="view">View</MenuItem>
                        <MenuItem value="edit">Edit</MenuItem>
                        <MenuItem value="delete">Delete</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Create Permission
                </Button>
            </Box>
        </Container>
    );
}

export default PermissionForm;


