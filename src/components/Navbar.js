import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Button from '@mui/material-next/Button';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Welcome to Saas Product Section
                </Typography>
                <Link to="/login">
                    <Button color="primary"
                        disabled={false}
                        size="large"
                        variant="filled">Login</Button>
                </Link>
                <Button color="primary"
                    disabled={false}
                    size="large"
                    variant="filledTonal">SignUp</Button>

            </Toolbar>

        </AppBar>


    );
}

export default Navbar;
