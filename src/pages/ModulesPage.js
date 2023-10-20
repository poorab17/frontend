import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, Container, Grid, Grow, AppBar, Toolbar, Box, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from '../components/Notification';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import axios from 'axios';
import api from '../api';

function ModulesPage() {
    const [modules, setModules] = useState([]);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        // Fetch modules from the backend
        axios.get('http://localhost:5000/api/modules/')
            .then((response) => {
                setModules(response.data);
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
            });
    }, []);

    const openConfirmDialog = (module) => {
        setIsConfirmDialogOpen(true);
        setModuleToDelete(module);
    };
    const closeConfirmDialog = () => {
        setIsConfirmDialogOpen(false);
        setModuleToDelete(null);
    };


    const handleDeleteModule = (moduleId) => {
        api.delete(`/api/modules/delete/${moduleId}`)
            .then((response) => {
                setModules(modules.filter((module) => module._id !== moduleId));
                setNotification({
                    open: true,
                    message: 'Module deleted successfully',
                    severity: 'success',
                });
            })
            .catch((error) => {
                console.error('Error deleting module:', error);
                setNotification({
                    open: true,
                    message: 'Error deleting module',
                    severity: 'error',
                });
            });
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Module Management</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/superadmin/modules/create"
                    >
                        Create New Module
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ padding: '30px' }}></Box>
                <div>
                    <Container>
                        <Grid container spacing={2}>
                            {modules.map((module) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={module._id}>
                                    <Grow in={true} timeout={1000}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {module.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {module.description}
                                                </Typography>
                                                <Button variant="contained" color="primary">
                                                    View Details
                                                </Button>
                                            </CardContent>
                                            <Button
                                                variant="contained"
                                                color="error" // You can adjust the color to match your theme
                                                startIcon={<DeleteIcon />}
                                                onClick={() => openConfirmDialog(module)}
                                            >
                                                Delete
                                            </Button>
                                            <DeleteConfirmationDialog
                                                open={isConfirmDialogOpen}
                                                onClose={closeConfirmDialog}
                                                onDelete={() => {
                                                    handleDeleteModule(moduleToDelete._id);
                                                    closeConfirmDialog();
                                                }}
                                            />

                                        </Card>
                                    </Grow>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </div>
            </Container>
        </div>
    );
}

export default ModulesPage;
