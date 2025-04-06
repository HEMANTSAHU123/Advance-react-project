import React, { useState, useEffect, useContext } from 'react';
import notecontext from './store/Context';
import { Modal, Button, Form as BootstrapForm, FormGroup, FormLabel, FormControl, Container, Row, Col } from 'react-bootstrap';
import { ref, push, onValue, remove } from 'firebase/database';
import { database } from './firebase/firebase';

const Form = ({ isModalOpen, setIsModalOpen }) => {
    const context = useContext(notecontext);
    const [data, setData] = useState(context.userList);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchInitialNotes = () => {
       
        const notesRef = ref(database, 'notes');
        onValue(notesRef, (snapshot) => {
            const fetchedNotes = [];
            const firebaseData = snapshot.val();
            if (firebaseData) {
                Object.keys(firebaseData).forEach((key) => {
                    fetchedNotes.push({ id: key, ...firebaseData[key] });
                });
            }
            context.setUserList(fetchedNotes);
            context.setTotal(fetchedNotes.length);
            context.setShowing(fetchedNotes.length);
            setLoading(false);
        }, (err) => {
            setError(err.message);
            setLoading(false);
            console.error('Error fetching notes from Firebase:', err);
        });
    };

    const addnotetofirebase = async (note) => {
        try {
            const notesRef = ref(database, 'notes');
            const newNoteRef = await push(notesRef, note);
            return newNoteRef.key;
        } catch (err) {
            setError(err.message);
            console.error('Error adding notes to Firebase:', err);
            return null;
        }
    };

    const handleAddNote = async (note) => {
        await addnotetofirebase(note);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        handleAddNote(data);
        setData({ name: '', desc: '' });
        setIsModalOpen(false);
    };

    const deleteNoteFromFirebase = async (firebaseId) => {
        try {
            const noteRef = ref(database, `notes/${firebaseId}`);
            await remove(noteRef);
            return true;
        } catch (err) {
            setError(err.message);
            console.error('Error deleting note from Firebase:', err);
            return false;
        }
    };

    const handleDeleteNote = async (id) => {
        await deleteNoteFromFirebase(id);
    };

   
    useEffect(() => {
      fetchInitialNotes();
  }, []);

    return (
        <Container className="my-4 p-4 bg-light rounded shadow-sm">
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BootstrapForm onSubmit={handleSubmitForm}>
                        <FormGroup className="mb-3" controlId="formNoteTitle">
                            <FormLabel>Note Title</FormLabel>
                            <FormControl
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter note title"
                                required
                            />
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formNoteDescription">
                            <FormLabel>Note Description</FormLabel>
                            <FormControl
                                as="textarea"
                                name="desc"
                                value={data.desc}
                                onChange={handleChange}
                                placeholder="Enter note description"
                                rows={3}
                                required
                            />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Add to Note
                        </Button>
                    </BootstrapForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ul className="list-group mt-3">
                {context.userList.length > 0 &&
                    context.userList.map((note) => (
                        <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{note.name}</h5>
                                <p className="mb-0 text-muted">{note.desc}</p>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteNote(note.id)}>
                                Delete
                            </Button>
                        </li>
                    ))}
            </ul>
        </Container>
    );
};

export default Form;