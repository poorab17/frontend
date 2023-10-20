import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Grid, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';

function SuperAdmin({ children }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refresh_token');
        navigate('/');
    }

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Super Admin Dashboard</Typography>
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
                                    <ListItemText primary="Tenants" />
                                </ListItem>
                                <ListItem button component={Link} to="/superadmin/permissions">
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
        </div>
    );
}

export default SuperAdmin;
