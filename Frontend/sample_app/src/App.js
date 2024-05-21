import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Login from './Login';
import { Container } from '@mui/material';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    if (!authenticated) {
        return <Login setAuthenticated={setAuthenticated} />;
    }

    return (

        <Container>
            <TaskList />
        </Container>
    );
};

export default App;
