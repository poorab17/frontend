import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component for navigation
import api from '../../../api';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CssBaseline, AppBar, Toolbar } from '@mui/material';

function PermissionDetails() {
    const [details, setDetails] = useState({
        tenants: [],
        modules: [],
        rbac: [],
        permissions: [],
    });

    useEffect(() => {
        // Fetch permission details from your backend
        api.get('/api/modules/permission/details').then((response) => {
            setDetails(response.data);
        });
    }, []);

    return (
        <div>
            <CssBaseline />

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Permission Details</Typography>
                    <Link to="/superadmin/permission/create"> {/* Use Link to navigate */}
                        <Button variant="contained" color="secondary" >Create New Permission</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Button
                component={Link} // Using RouterLink from react-router-dom
                to="/superadmin"
                variant="outlined"
                color="primary"
                style={{ marginTop: "20px", marginLeft: "20px", maxWidth: "100px" }}
                size="small"
            >
                Back
            </Button>
            <Container>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                background: "lightblue",
                                color: "darkblue",
                                fontWeight: "bold",
                                width: "120px",
                            }}>
                                <TableCell ><b>Tenant Name</b></TableCell>
                                <TableCell><b>Module Name</b></TableCell>
                                <TableCell><b>RBAC</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {details.permissions.map((permission, index) => (
                                <TableRow key={index}>
                                    <TableCell>{permission.tenantName}</TableCell>
                                    <TableCell>{permission.moduleName.join(', ')}</TableCell>
                                    <TableCell>{permission.rbac.join(', ')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default PermissionDetails;
