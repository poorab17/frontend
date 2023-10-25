import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../../../components/Notification';
import { Link } from 'react-router-dom';
import api from '../../../api';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    CssBaseline,
    TextField,
    Button,
    Input,
} from '@mui/material';

function EditModuleForm() {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [file, setFile] = useState(null);
    const [currentFileName, setCurrentFileName] = useState('No file chosen'); // Default value

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/login');
            return;
        }
        api.get(`/api/modules/${moduleId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => {
                const moduleData = response.data;
                if (moduleData) {
                    setModuleName(moduleData.name);
                    setModuleDescription(moduleData.description);
                    setCurrentFileName(moduleData.file.filename); // Set the current file name
                } else {
                    setNotification({
                        open: true,
                        message: 'Module not found or empty data',
                        severity: 'error',
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching module data:', error);
                setNotification({
                    open: true,
                    message: 'Error fetching module data',
                    severity: 'error',
                });
            });
    }, [moduleId, navigate]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setCurrentFileName(selectedFile.name); // Set the current file name when a new file is chosen
        }
    };

    const handleModuleEdit = () => {
        const formData = new FormData();
        formData.append('name', moduleName);
        formData.append('description', moduleDescription);
        if (file) {
            formData.append('file', file);
        }

        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/login');
            return;
        }

        api.put(`/api/modules/edit/${moduleId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => {
                console.log('Module edited successfully:', response.data);
                setNotification({
                    open: true,
                    message: 'Module edited successfully',
                    severity: 'success',
                });
                navigate(`/superadmin/modules`);
            })
            .catch((error) => {
                console.error('Error editing module:', error);
                setNotification({
                    open: true,
                    message: 'Error editing module',
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
                    <Typography variant="h6">Edit Module</Typography>
                </Toolbar>
            </AppBar>
            <Button
                component={Link} // Using RouterLink from react-router-dom
                to="/superadmin/modules"
                variant="outlined"
                color="primary"
                style={{ marginTop: "20px", marginLeft: "20px", maxWidth: "100px" }}
                size="small"
            >
                Back
            </Button>
            <Container>
                <form encType="multipart/form-data">
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
                    <Input
                        type="file"
                        fullWidth
                        margin="normal"
                        onChange={handleFileChange}
                    />
                    <TextField
                        label="Current File Name"
                        fullWidth
                        margin="normal"
                        value={currentFileName}
                        disabled
                    />
                    <Button sx={{ marginTop: '10px' }}
                        variant="contained"
                        color="primary"
                        onClick={handleModuleEdit}
                    >
                        Save Changes
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

export default EditModuleForm;
