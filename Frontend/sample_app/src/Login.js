import react, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('yuuki');
    const [password, setPassword] = useState('12345');

    const handleLogin = async (e) => {
        e.preventDefaurt();
        try{
            const response = await axios.post('/login', {}, {
                auth: {
                    username,
                    password
                }
            });
            if(response.status === 200) {
                setAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt:8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                         label="username"
                         variant="outlined"
                         margin="normal"
                         fullWidth
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variation="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 2}}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;