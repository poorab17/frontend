import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Notification({ open, handleClose, message, severity }) {
    return (
        <Snackbar

            open={open} autoHideDuration={6000} onClose={handleClose}>
            <div>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </div>
        </Snackbar>
    );
}

export default Notification;
