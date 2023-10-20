import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import api from '../api';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    CssBaseline,
    TextField,
    Button,
} from '@mui/material';

function CreateModuleForm() {
    const navigate = useNavigate();
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleModuleCreate = () => {
        const data = {
            name: moduleName,
            description: moduleDescription,
        };

        // Make a POST request to the backend's /create route
        api.post('/api/modules/create', data)
            .then((response) => {
                console.log('Module created successfully:', response.data);
                setNotification({
                    open: true,
                    message: 'Module created successfully',
                    severity: 'success',
                });
                navigate("/superadmin/modules");
            })
            .catch((error) => {
                console.error('Error creating module:', error);
                setNotification({
                    open: true,
                    message: 'Error creating module',
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
                    <Typography variant="h6">Create Module</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <form>
                    <TextField
                        label="Module Name"
                        fullWidth
                        margin="normal"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                    />
                    <TextField
                        label="Module Description"
                        fullWidth
                        margin="normal"
                        value={moduleDescription}
                        onChange={(e) => setModuleDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleModuleCreate}
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

export default CreateModuleForm;