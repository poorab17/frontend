import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../../api";
import {
    Container,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
function ViewTenantForm() {
    const { tenantId } = useParams();
    const initialState = { name: "", username: "", role: "", description: "" };
    const [tenant, setTenant] = useState(initialState);

    useEffect(() => {
        fetchTenant();
    }, []);


    const fetchTenant = () => {
        api
            .get(`/api/tenants/${tenantId}`)
            .then((response) => {
                console.log(response.data);
                setTenant(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data :", error);
            });
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        View Tenant
                    </Typography>
                </Toolbar>
            </AppBar>
            <Button
                component={Link} // Using RouterLink from react-router-dom
                to="/superadmin/tenants"
                variant="outlined"
                color="primary"
                style={{ marginTop: "20px", marginLeft: "20px", maxWidth: "100px" }}
                size="small"
            >
                Back
            </Button>
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
                            <Typography variant="h6" style={{ marginTop: "16px" }}>
                                <b>Tenant Id: </b>
                                {tenant._id}
                            </Typography>
                            <List variant="flush" style={{ padding: "16px" }}>
                                <ListItem>
                                    <ListItemText>
                                        <b>NAME:</b> {tenant.name}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>USERNAME:</b> {tenant.username}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>ROLE:</b> {tenant.role}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>DESCRIPTION:</b> {tenant.description}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
export default ViewTenantForm;