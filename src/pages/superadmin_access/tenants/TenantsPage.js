import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../api";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from "@mui/material";
import {
    Card,
    CardContent,
    Button,
    Typography,
    Container,
    Grid,
    Grow,
    AppBar,
    Toolbar,
    Box,
    CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import DeleteConfirmationDialog from "../../../components/DeleteConfirmationDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function TenantsPage() {
    const navigate = useNavigate();
    const [tenants, setTenants] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [tenantToDelete, setTenantToDelete] = useState(null);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make an HTTP request to fetch tenant data from your backend
        api
            .get("/api/tenants/")
            .then((response) => {
                setTenants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tenants:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDeleteTenant = (tenantId) => {
        // Open the delete confirmation dialog
        setTenantToDelete(tenantId);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteTenant = () => {
        // Perform the actual module deletion
        api
            .delete(`/api/tenants/delete/${tenantToDelete}`)
            .then((response) => {
                // Remove the deleted module from the state
                setTenants(tenants.filter((tenant) => tenant._id !== tenantToDelete));
                // Close the delete dialog
                setDeleteDialogOpen(false);
            })
            .catch((error) => {
                console.error("Error deleting module:", error);
            });
    };

    const closeDeleteDialog = () => {
        // Close the delete dialog
        setDeleteDialogOpen(false);
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Tenant Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/superadmin/tenants/create"
                    >
                        Create New Tenant
                    </Button>
                </Toolbar>
            </AppBar>

            <Button
                component={Link} // Use RouterLink from react-router-dom
                to="/superadmin"
                variant="outlined"
                color="primary"
                style={{ marginTop: "5px" }}
            >
                Back
            </Button>
            <Container>
                <Box sx={{ padding: "30px" }}></Box>
                <div>
                    <TableContainer component={Paper}>
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <p>Error: {error.message}</p>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                background: "lightblue",
                                                color: "darkblue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                background: "lightblue",
                                                color: "darkblue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Username
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                background: "lightblue",
                                                color: "darkblue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Description
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                background: "lightblue",
                                                color: "darkblue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Role
                                        </TableCell>
                                        {/* Add more table headers for other tenant data */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tenants.map((tenant) => (
                                        <TableRow key={tenant._id}>
                                            <TableCell>{tenant.name}</TableCell>
                                            <TableCell>{tenant.username}</TableCell>
                                            <TableCell>{tenant.description}</TableCell>
                                            <TableCell>{tenant.role}</TableCell>
                                            {/* Render more table cells for other tenant data */}
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                    onClick={() =>
                                                        navigate(`/superadmin/tenants/${tenant._id}/view`)
                                                    } // view tenant route
                                                    sx={{ margin: "4px" }}
                                                >
                                                    View
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="success" // Use the desired color
                                                    size="small"
                                                    startIcon={<EditIcon />} // Use the "Edit" icon
                                                    onClick={() =>
                                                        navigate(`/superadmin/tenants/${tenant._id}/edit`)
                                                    } // Edit route
                                                    sx={{ margin: "4px" }}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeleteTenant(tenant._id)}
                                                    sx={{ width: "100px" }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </div>
            </Container>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                onDelete={confirmDeleteTenant}
            />
        </div>
    );
}

export default TenantsPage;
