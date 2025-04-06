import React, { useState } from 'react';
import SearchNote from './SearchNote';
import Form from './Form';
import { Container, Button } from 'react-bootstrap';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Container className="mt-4">
            <h1>My Notes App</h1>
            <SearchNote />
            <Button variant="primary" className="mt-3" onClick={handleOpenModal}>
                Add New Note
            </Button>
            <Form isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Container>
    );
};

export default App;