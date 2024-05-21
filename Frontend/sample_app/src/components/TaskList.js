import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleToggle = async (task) => {
        task.completed = !task.completed;
        await axios.put(`/api/tasks/${task.id}`, task);
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    };

    const handleDelete = async (taskId) => {
        await axios.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Task List
            </Typography>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id} button onClick={() => handleToggle(task)}>
                        <Checkbox
                            edge="start"
                            checked={task.completed}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={task.title} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TaskList;
