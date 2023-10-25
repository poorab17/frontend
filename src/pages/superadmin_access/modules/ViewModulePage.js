// ViewModulePage.js
import React, { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Button,
    Card,
    CardContent,
    CssBaseline,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';

function ViewModulePage() {
    const { moduleId } = useParams();
    const [module, setModule] = useState();

    useEffect(() => {
        // Fetch module details by ID
        api
            .get(`/api/modules/${moduleId}`)
            .then((response) => {
                console.log(response.data);
                setModule(response.data);

            })
            .catch((error) => {
                console.error('Error fetching module details:', error);
            });
    }, [moduleId]);

    return (
        <div>
            <CssBaseline />
            <Container>
                <Typography variant="h4" gutterBottom>
                    Module Details
                </Typography>
                <Button component={Link} to="/superadmin/modules" variant="contained">
                    Back to Modules
                </Button>
                {module && (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Name: {module.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Description: {module.description}
                            </Typography>
                            {module.file && (
                                <div>
                                    {module.file.filename.toLowerCase().endsWith('.jpg') && (
                                        <img
                                            src={`/images/${module.file.filename}`}
                                            alt="Module Image"
                                            style={{ maxWidth: '100%' }}
                                        />
                                    )}
                                    {module.file.filename.toLowerCase().endsWith('.txt') && (
                                        // Replace this with a component or formatting for displaying text content
                                        <div>
                                            <h4>Text Content</h4>
                                            <pre>
                                                {module.file.fileContent}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

            </Container>
        </div>
    );
}

export default ViewModulePage;
