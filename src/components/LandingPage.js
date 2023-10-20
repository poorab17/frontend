
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Typography, Container, Grid, Grow, AppBar, Toolbar, Box } from '@mui/material';
import Navbar from './Navbar';

function LandingPage() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/modules/')
            .then((response) => {
                setModules(response.data);
            })
            .catch((error) => {
                console.error('Error fetching modules:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <Box sx={{ padding: '50px' }}></Box>
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
                                </Card>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default LandingPage;

