
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login({ onSuccessfulLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        let role = null;
        api
            .post('/api/auth/login', { username, password })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                if (response.data.payload.isSuperadmin) {
                    onSuccessfulLogin('superadmin', token);
                    navigate("/superadmin");
                } else if (response.data.payload.isTenant) {
                    onSuccessfulLogin('tenant', token);
                    navigate("/tenant");
                } else {
                    onSuccessfulLogin('customer', token);
                    navigate("/customer");
                }
            })
            .catch((error) => {
                // Handle login error here
                console.error('Login error:', error);
            });
    };

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;

