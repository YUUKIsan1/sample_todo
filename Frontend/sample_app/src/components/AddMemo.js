import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box } from '@mui/material';

const AddMemo = ({ onAdd }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMemo = { content };
        const response = await axios.post('/api/memos', newMemo);
        onAdd(response.data);
        setContent('');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="New Memo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Add Memo
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddMemo;
