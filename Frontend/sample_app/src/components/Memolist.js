import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MemoList = () => {
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        const fetchMemos = async () => {
            const response = await axios.get('/api/memos');
            setMemos(response.data);
        };
        fetchMemos();
    }, []);

    const handleDelete = async (memoId) => {
        await axios.delete(`/api/memos/${memoId}`);
        setMemos(memos.filter(memo => memo.id !== memoId));
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Memo List
            </Typography>
            <List>
                {memos.map(memo => (
                    <ListItem key={memo.id}>
                        <ListItemText primary={memo.content} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(memo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default MemoList;
