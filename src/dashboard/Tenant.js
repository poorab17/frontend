import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Grid, Drawer, List, ListItem, ListItemText, ListItemIcon, Card, CardContent } from '@mui/material';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';

function Tenant({ children }) {
    const navigate = useNavigate();

    const initialState = { name: "", username: "", role: "", description: "" };
    const [tenant, setTenant] = useState(initialState);
    console.log(tenant.tenantSpecificData);
    const [isLoading, setIsLoading] = useState(true);


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refresh_token');
        navigate('/');
    }

    useEffect(() => {
        fetchTenant();
    }, []);


    const fetchTenant = () => {
        const token = localStorage.getItem('jwtToken');
        console.log(token, "tenants token");
        if (!token) {
            console.error('JWT token is missing. Please check authentication.');
            setIsLoading(false);
            return;
        }

        api.get(`/api/tenants/mydata`, {
            headers: {
                Authorization: `Bearer ${token}` // Send your JWT token
            }
        })
            .then((response) => {
                console.log(response.data);
                setTenant(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Tenant Dashboard</Typography>
                    <Button variant="contained"
                        color="secondary"
                        onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container>
                    <Drawer variant="permanent">
                        <Grid item xs={3}>
                            <List>
                                <ListItem button component={Link} to="/superadmin/modules">
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Modules" />
                                </ListItem>
                                <ListItem button component={Link} to="/superadmin/tenants">
                                    <ListItemIcon>
                                        <BusinessIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Customers" />
                                </ListItem>
                                <ListItem button component={Link} to="/superadmin/permission/details">
                                    <ListItemIcon>
                                        <SecurityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Permissions" />
                                </ListItem>
                            </List>
                        </Grid>


                        <Grid item xs={9}>
                            {/* Main content */}
                            {children}
                        </Grid>
                    </Drawer>
                </Grid>
            </Container>
            <Grid container justifyContent="center" sx={{ pt: 4 }}>
                <Grid item xs={12} sm={6}>
                    <Card
                        variant="outlined"
                        sx={{
                            backgroundColor: "lightblue",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardContent>
                            {tenant.tenantSpecificData ? (
                                <div>
                                    <Typography variant="h6" style={{ marginTop: "16px" }}>
                                        <b>Tenant Id: </b>
                                        {tenant.tenantSpecificData._id}
                                    </Typography>
                                    <List variant="flush" style={{ padding: "16px" }}>
                                        <ListItem>
                                            <ListItemText>
                                                <b>NAME:</b> {tenant.tenantSpecificData.name}
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>
                                                <b>USERNAME:</b> {tenant.tenantSpecificData.username}
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>
                                                <b>ROLE:</b> {tenant.tenantSpecificData.role}
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText>
                                                <b>DESCRIPTION:</b> {tenant.tenantSpecificData.description}
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                            ) : (
                                <p>Tenant data not available</p>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Tenant;
