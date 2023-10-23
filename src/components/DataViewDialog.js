import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

function DataViewDialog({ open, onClose, title, data }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <List>
                    {data.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={item.name}
                                secondary={item.description}
                            />
                        </ListItem>
                    ))}
                </List>
                {data.file && ( // Check if there's a file associated with the data
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // Implement the file download or view logic here
                            // You can open a new tab to view the file or trigger a download
                        }}
                    >
                        Download File
                    </Button>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DataViewDialog;
